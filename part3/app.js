const express = require('express');
const app = express();
const logger = require('./logger');

app.use(logger);
app.use(express.static('public'));

app.get('/bikes', function(request, response){
  var bikes = ['Eightbike', 'Colossi', 'Airwalk'];
  response.json(bikes);
})

app.listen(3000, () => (console.log('Initializing server')));
