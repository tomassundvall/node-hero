// file:config/index.js
const config = {}

config.redisStore = {
    url: process.env.REDIS_STORE_URI,
    secret: process.env.REDIS_STORE_SECRET
}