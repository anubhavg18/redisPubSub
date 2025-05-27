How It Works

1. `receiver.js` receives POST requests, validates the input, stores it in MongoDB (`firstTable`), and publishes the event to Redis channel `user.created`.

2. `listener.js` subscribes to `user.created`, processes the event by appending a `modified_at` timestamp, and saves it into another MongoDB collection (`secondTable`).




Services:

receiver → http://localhost:3000

listener → runs in background

mongo → database

redis → Pub/Sub broker

To run the project
1: Run Docker on your local system

2: Run MongoDB and Redis on your Ubuntu server(installed using WSL)
sudo systemctl start mongodb
sudo systemctl start redis-server.service

3: Run Curl command in Postman
curl --location 'http://localhost:3001/receiver' \
--header 'Content-Type: application/json' \
--data-raw '{
  "age": 25,
  "email": "user2@example.com",
  "class": "Math101",
  "user":"user2"
}
'

4: Check your WSL-based MongoDB database, a new pubsubDB is created with all records.
