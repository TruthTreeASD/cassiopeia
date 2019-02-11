const express = require('express');
const proxy = require('express-http-proxy');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;

const TRUTHTREE_API = 'https://truthtree.herokuapp.com';

app.get('/api/states/:stateId', (req, res) => {
  axios
    .get(`${TRUTHTREE_API}/api/states`)
    .then(({ data }) => {
      const filtered = data.filter(
        state => state.state_code === parseInt(req.params.stateId)
      );

      if (filtered.length === 1) {
        res.send(filtered[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => console.log(err) || res.sendStatus(500));
});

app.use('/', proxy(TRUTHTREE_API));

app.listen(PORT, () =>
  console.log(`Proxy server is listening on port ${PORT}`)
);
