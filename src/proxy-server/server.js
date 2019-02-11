const express = require('express');
const proxy = require('express-http-proxy');
const axios = require('axios');
const TRUTHTREE_URI = require('../constants').TRUTHTREE_URI;

const app = express();
const PORT = process.env.PORT || 4000;

const findLocation = (idFieldName, locationId, data) => {
  return data.find(location => location[idFieldName] === parseInt(locationId));
};

app.get('/api/states/:stateId', (req, res) => {
  axios
    .get(`${TRUTHTREE_URI}/api/states`)
    .then(({ data }) => {
      const state = findLocation('state_code', req.params.stateId, data);
      if (state) {
        res.send(state);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => console.log(err) || res.sendStatus(500));
});

app.use('/', proxy(TRUTHTREE_URI));

app.listen(PORT, () =>
  console.log(`Proxy server is listening on port ${PORT}`)
);
