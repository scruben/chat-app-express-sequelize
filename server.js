'use strict'

//const http = require('http');
const express = require('express');
const fs = require('fs');

//const dm = require('./datamanager.js');
const router = require('./router.js');
const db = require('./db.js');

var app = express();

app.use(router);
app.use(express.static('static'));
app.use(function (req, res) {
  res.status(404).sendFile(__dirname + '/static/404.html');
});

db.sequelize.sync().then(function() {
  app.listen(8080);
});
