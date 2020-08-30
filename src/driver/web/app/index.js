const express = require('express');
const landing_page = require('./landing_page');

module.exports = (app) => {

  app.use(express.static(__dirname + '/public'));
  
  app.use(landing_page);

  app.set('view engine', 'pug');
  app.set('views', __dirname + '/views');
}