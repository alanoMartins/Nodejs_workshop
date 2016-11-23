const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const parseUrlencoded = bodyParser.urlencoded({ exnteds: false });

var bikes = [
  { name: 'Eightbike', frame: 'Steel 45', tamanho: '57'},
  { name: 'Colossi', frame: 'Cr Mo', tamanho: '54'},
  { name: 'Airwalk', frame: 'Hi ten', tamanho: '52'}];

router.route('/')
.get(function(request, response) {
  if (request.query.limit >= 0) {
    response.json(bikes.slice(0, request.query.limit));
  } else {
    response.json(bikes);
  }
})
.post(parseUrlencoded, function(request, response) {
  const newBike = request.body;
  bikes.push(newBike);
  response.json(newBike);
});

router.route('/:name')
.all(function(req, res, next) {
  const name = req.params.name;
  const bike = name[0].toUpperCase() + name.slice(1).toLowerCase();
  req.bikeName = bike;

  next();
})
.get(function(request, response) {
  const specs = bikes.find(bike => bike.name.toLowerCase() === request.bikeName.toLowerCase());
  if (!specs) {
    response.status(404).json(`No specs found for ${request.params.name}`);
  } else {
    response.json(specs);
  }
})
.delete(function(request, response) {
  const index = bikes.map(bike => bike.name).indexOf(request.bikeName);
  if (index < -1) {
    response.status(404).json(`No bike found`);
  } else {
    const deleted = bikes[index];
    bikes.splice(index, 1);
    response.sendStatus(200);
  }
});

module.exports = router;
