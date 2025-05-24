const Redis = require('ioredis');
const { connectDB } = require('./database');

(async () => {
  const db = await connectDB();
const redis = new Redis({ host: process.env.REDIS_HOST || 'localhost' });

  redis.subscribe('user.created', () => {
    console.log('Subscribed to user.created');
  });

  redis.on('message', async (channel, message) => {
    const data = JSON.parse(message);
    const newData = {
      ...data,
      modified_at: new Date().toISOString(),
    };

    await db.collection('secondTable').insertOne(newData);
    console.log('secondTable data saved by listener');
  });

  redis.on('error', (err) => {
    console.error('Redis error:', err);
  });
})();
