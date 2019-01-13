var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Anuncio = mongoose.model('anuncio');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Anuncio.find({}, (err, anuncios) => {
        res.render('anuncio', { anuncios: anuncios });
        // return res.status(200).json(anuncios);
  });
});

module.exports = router;
