const express = require('express');
const cors = require('cors');
const app = express().use(cors());

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use(require('./routes/index'));

app.listen(3000, () => console.log('Server on port 3000'));

module.exports = app;