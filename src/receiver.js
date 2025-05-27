const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const Redis = require('ioredis');

const { connectDB } = require('./database'); // database.js file that creates connection to mongodb
const { requestSchema } = require('./requestValidator'); // requestValidator.js file that validates input request body

const app = express();
const port = 3000;

app.use(bodyParser.json());

(async () => {
//Connect to MongoDB and redis
const redis = new Redis('redis://redis:6379');


app.post('/receiver', async (req, res) => {
    let { error } = requestSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newUser = {
        id: uuidv4(),
        ...req.body, //Object contains user, class, age, email received from request
        inserted_at: new Date().toISOString(),
    };
    const db = await connectDB();
    let dbRes = await db.collection('firstTable').insertOne(newUser);
    await redis.publish('user.created', JSON.stringify(newUser));

    res.json({ message: 'firstTable data received and event published', dbRes });
});

app.listen(port, () => console.log(`Receiver service running on port ${port}`))
})();
