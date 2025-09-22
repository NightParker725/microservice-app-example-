const redis = require("redis");
const client = redis.createClient({ host: process.env.REDIS_HOST || 'redis', port: 6379 });

function cacheAside(key, ttlSeconds, fetcher) {
  return new Promise((resolve, reject) => {
    client.get(key, async (err, cached) => {
      if (err) return reject(err);
      if (cached) return resolve(JSON.parse(cached));
      try {
        const fresh = await fetcher();
        client.setex(key, ttlSeconds, JSON.stringify(fresh));
        resolve(fresh);
      } catch (e) { reject(e); }
    });
  });
}

module.exports = { cacheAside, client };
