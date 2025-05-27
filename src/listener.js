const Redis = require('ioredis');
const { connectDB } = require('./database');

(async () => {
  const db = await connectDB();
  const redis = new Redis('redis://redis:6379');

  redis.subscribe('user.created', () => {
    console.log('Subscribed to user.created');
  });

  redis.on('message', async (channel, message) => {
    const data = JSON.parse(message);
    const newData = {
      ...data,
      modified_at: new Date().toISOString(),
    };

    let dbRes = await db.collection('secondTable').insertOne(newData);
    console.log('secondTable data saved by listener', dbRes);
  });

  redis.on('error', (err) => {
    console.error('Redis error:', err);
  });
})();
