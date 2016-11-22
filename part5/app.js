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

app.param('name', function(req, res, next) {
  const name = req.params.name;
  const bike = name[0].toUpperCase() + name.slice(1).toLowerCase();
  req.bikeName = bike;

  next();
})

app.get('/bikes', function(request, response) {
  if (request.query.limit >= 0) {
    response.json(bikes.slice(0, request.query.limit));
  } else {
    response.json(bikes);
  }
});

app.get('/bikes/:name', function(request, response) {
  const specs = bikes[request.bikeName];
  if (!specs) {
    response.status(404).json(`No specs found for ${request.params.name}`);
  } else {
    response.json(specs);
  }
});

app.listen(3000, () => (console.log('Initializing server')));
