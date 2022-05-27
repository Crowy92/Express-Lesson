const express = require('express')
const cats = require('./data')
const catRoutes = require('./controllers/cats');
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/cats', catRoutes);

app.post('/', (req, res) => {
    res.status(405).send('Not allowed!')
})

module.exports = app;

