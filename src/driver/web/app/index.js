const express = require('express');
const landing_page = require('./landing_page');
const prestataire = require('./prestataire');
const donneur_dordre = require('./donneur_dordre');

module.exports = (app) => {

  app.use(express.static(__dirname + '/public'));
  
  app.use(landing_page);
  app.use('/prestataire', prestataire);
  app.use('/donneur-dordre', donneur_dordre);

  app.set('view engine', 'pug');
  app.set('views', __dirname + '/views');
}