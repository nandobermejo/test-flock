const express = require('express');
const router = express.Router();
const axios = require('axios');
const redis = require('redis');
const client = redis.createClient(process.env.PRIVATE_REDIS_PORT,process.env.PRIVATE_REDIS_URL);

const cache = (req, res, next) => {
  client.get('test_drones', function (err, data) {
    if (err) next();

    if (data) res.send(JSON.parse(data));
    else next();
  });
}

router.get('', cache, (req, res, next) => {
  axios.get(`${process.env.API_URL}/drones`)
  .then((response) => {
    client.setex('test_drones', 60, JSON.stringify(response.data));
    res.send(response.data)
  })
  .catch((err) => next(err))
});

module.exports = router;
