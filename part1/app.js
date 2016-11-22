const express = require('express');
const app = express();

// var req = exports = module.exports = {
//   __proto__: http.IncomingMessage.prototype
// }

// var res = exports = module.exports = {
//   __proto__: http.ServerResponse.prototype
// }

app.get('/', function(request, response){
  response.write('Hello world');
  response.end();
});

app.get('/blocks', function(request, response){
  const blocks = ['Fixed', 'Movable', 'Rotating'];
  // response.send(blocks);
  response.json(blocks);
});

app.get('/blocksRed', function(request, response){
  const blocks = ['Fixed', 'Movable', 'Rotating'];
  response.redirect(301, '/parts');
});

app.listen(3000, () => (console.log('Initializing server')));
