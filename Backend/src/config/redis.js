const { createClient } = require('redis');

const redisClient = createClient({
    username: 'default',
    password:process.env.REDIS_PASS,
    socket: {
        host: 'redis-15331.c277.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 15331
    }
});

module.exports = redisClient;