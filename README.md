How It Works

1. `receiver.js` receives POST requests, validates the input, stores it in MongoDB (`firstTable`), and publishes the event to Redis channel `user.created`.

2. `listener.js` subscribes to `user.created`, processes the event by appending a `modified_at` timestamp, and saves it into another MongoDB collection (`secondTable`).




Services:

receiver → http://localhost:3000

listener → runs in background

mongo → database

redis → Pub/Sub broker
