const express = require('express');
const router = express.Router();
const axios = require('axios');
const redis = require('redis');
const client = redis.createClient(process.env.PRIVATE_REDIS_PORT,process.env.PRIVATE_REDIS_URL);

const cache = (req, res, next) => {
  client.get('test_drones', function (err, data) {
    if (err) request(req, res, next);

    if (data) res.send(JSON.parse(data));
    else request(req, res, next);
  });
}

const request = (req, res, next) => {
  axios.get(`${process.env.API_URL}/drones`)
  .then((response) => {
    client.setex('test_drones', 10, JSON.stringify(response.data));
    res.send(response.data)
  })
  .catch((err) => cache(req,res,next))
}

router.get('', request);

module.exports = router;
