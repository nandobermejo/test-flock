const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id', (req, res, next) => {
  axios.get(process.env.API_URL +'/drone/' + req.params.id)
  .then((response) => res.send(response.data))
  .catch((err) => next(err))
});

module.exports = router;
