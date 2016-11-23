const express = require('express');
const app = express();
const logger = require('./logger');
const bikes = require('./routes/bikes');

app.use(logger);
app.use(express.static('public'));

// Routes
app.use('/bikes', bikes);

app.listen(3000, () => (console.log('Initializing server')));
