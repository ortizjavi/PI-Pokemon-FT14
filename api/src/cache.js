var mcache = require('memory-cache');


module.exports = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url;
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      res.setHeader('x-cache', 'HIT');
      return res.status(cachedBody.status).send(cachedBody.body);
    } else {
      console.log(`Caching ${key.slice('__express__'.length)}...`);
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, {body, status: res.statusCode}, duration * 1000);
        res.setHeader('x-cache', 'MISS');
        res.sendResponse(body);
      }
      next();
    }
  }
}