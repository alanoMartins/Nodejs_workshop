const express = require('express');
const app = express();

// app.get('/', function(request, response){
//   response.sendFile(__dirname + '/public/index.html');
// });

app.use(express.static('public'));

app.get('/bikes', function(request, response){
  var bikes = ['Eightbike', 'Colossi', 'Airwalk'];
  response.json(bikes);
})

app.listen(3000, () => (console.log('Initializing server')));
