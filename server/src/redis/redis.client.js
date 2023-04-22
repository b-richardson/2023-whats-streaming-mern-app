import { createClient } from 'redis';
import { promisify } from "util"

// Connect to Redis server
const client = createClient({legacyMode: true});
// const client = createClient();

client.on('connect', () => {
  console.log('Connected!');
});

client.on('error', err => console.log('Redis Client Error', err));

// const getAsync = promisify(client.get).bind(client);
// const hGetAllAsync = promisify(client.hGetAll).bind(client);
// const sMembersAsync = client.sMembers
// const setAsync = promisify(client.set).bind(client);

export {
  client
};

// await client.set('key', 'value');
// const value = await client.get('key');
// await client.disconnect();