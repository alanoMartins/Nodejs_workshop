const express = require('express');
const app = express();
const logger = require('./logger');

const bodyParser = require('body-parser');
const parseUrlencoded = bodyParser.urlencoded({ exnteds: false });

app.use(logger);
app.use(express.static('public'));

var bikes = [
  { name: 'Eightbike', frame: 'Steel 45', tamanho: '57'},
  { name: 'Colossi', frame: 'Cr Mo', tamanho: '54'},
  { name: 'Airwalk', frame: 'Hi ten', tamanho: '52'}];

app.param('name', function(req, res, next) {
  const name = req.params.name;
  const bike = name[0].toUpperCase() + name.slice(1).toLowerCase();
  req.bikeName = bike;

  next();
});

app.get('/bikes', function(request, response) {
  if (request.query.limit >= 0) {
    response.json(bikes.slice(0, request.query.limit));
  } else {
    response.json(bikes);
  }
});

app.post('/bikes', parseUrlencoded, function(request, response) {
  const newBike = request.body;
  bikes.push(newBike);
  response.json(newBike);
});

app.get('/bikes/:name', function(request, response) {
  const specs = bikes.find(bike => bike.name.toLowerCase() === request.bikeName.toLowerCase());
  if (!specs) {
    response.status(404).json(`No specs found for ${request.params.name}`);
  } else {
    response.json(specs);
  }
});

app.delete('/bikes/:name', function(request, response) {
  const index = bikes.map(bike => bike.name).indexOf(request.bikeName);
  if (index < -1) {
    response.status(404).json(`No bike found`);
  } else {
    const deleted = bikes[index];
    bikes.splice(index, 1);
    response.sendStatus(200);
  }
});

app.listen(3000, () => (console.log('Initializing server')));
