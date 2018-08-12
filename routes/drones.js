const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('', (req, res, next) => {
  axios.get(process.env.API_URL +'/drones')
  .then((response) => res.send(response.data))
  .catch((err) => next(err))
});

module.exports = router;
