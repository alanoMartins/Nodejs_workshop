const express = require('express');
const app = express();
const logger = require('./logger');

app.use(logger);
app.use(express.static('public'));

const bikes = {
  Eightbike: { frame: 'Steel 45', tamanho: '57'},
  Colossi: { frame: 'Cr Mo', tamanho: '54'},
  Airwalk: { frame: 'Hi ten', tamanho: '52'}
};

app.get('/bikes', function(request, response) {
  if (request.query.limit >= 0) {
    response.json(bikes.slice(0, request.query.limit));
  } else {
    response.json(bikes);
  }
});

app.get('/bikes/:name', function(request, response) {
  const specs = bikes[request.params.name];
  if (!specs) {
    response.status(404).json(`No specs found for ${request.params.name}`);
  } else {
    response.json(specs);
  }
});

app.listen(3000, () => (console.log('Initializing server')));
