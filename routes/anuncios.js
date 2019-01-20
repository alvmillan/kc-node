var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Anuncio = mongoose.model('anuncio');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let query = Anuncio.find({});
  var pageOptions = {
    page: req.query.page || 0,
    limit: parseInt(req.query.limit) || 6
  }

  if (req.query.tag) {
    query.where('tags').in(req.query.tag);
  }

  if (req.query.venta) {
    query.where('venta').equals(req.query.venta);
  }

  if (req.query.nombre) {
    const expression = new RegExp('^'+ req.query.nombre, "i");
    query.where('nombre').regex(expression);
  }

  if (req.query.precio) {
    const res = req.query.precio.split('-');
    if (res.length == 1) {
      query.where('precio').equals(res[0]);
    } else {
      if (res[0]) {
        query.where('precio').gte(res[0]);
      }
  
      if (res[1]) {
        query.where('precio').lte(res[1]);
      }
  
      if (res[0] && res[1]) {
        query.where('precio').gte(res[0]).lte(res[1]);
      }
    }
  }

  if (req.query.sort) {
    query.sort(req.query.sort);
  }
  
  query.skip(pageOptions.page*pageOptions.limit)
  query.limit(pageOptions.limit)

  query.exec((err, anuncios) => {
    console.log(err);
    res.render('anuncio', { anuncios: anuncios });
  });
  
});

router.post('/', function(req, res, next) {
  console.log(req);
  Anuncio.insertMany(req.body, (err, anuncio) => {
    res.status(201).json({
        ok: true,
        anuncio: anuncio
    })
  });

});

router.get('/tags', function(req, res, next) {
  Anuncio.find({}).distinct('tags', function(err, tags) {
      res.status(200).send(JSON.stringify(tags));
  });
});

module.exports = router;
