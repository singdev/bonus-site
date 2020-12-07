const express = require('express');
const landing_page = require('./landing_page');
const prestataire = require('./prestataire');
const donneur_dordre = require('./donneur_dordre');
const sincro = require("./sincro");

module.exports = (app) => {

  app.use(express.static(__dirname + '/public'));
  
  app.use(landing_page);
  app.use('/prestataire', prestataire);
  app.use('/donneur-dordre', donneur_dordre);
  app.use('/app', sincro);
  
  app.get("/partage", (req, res) => {
    res.render('register_finish');
  })

  app.set('view engine', 'pug');
  app.set('views', __dirname + '/views');
}