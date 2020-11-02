import redis from 'async-redis';

const client = redis.createClient();
client.on("error", (err) => console.log(`Redis error: ${err}`));

export default client;