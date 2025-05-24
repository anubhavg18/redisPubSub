const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URL || 'mongodb://localhost:27017');

let db;
async function connectDB() {
  if (!db) {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      db = client.db('pubsubDB');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    }
  }
  return db;
}

module.exports = { connectDB };
