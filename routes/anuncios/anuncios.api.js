const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const Anuncio = mongoose.model('anuncio');
const filteredQuery = require('./anuncios.filters');

/**
 * @typedef Anuncio
 * @property {integer} _id
 * @property {string} nombre
 * @property {boolean} venta
 * @property {integer} precio
 * @property {string} foto - url de la foto
 * @property {Array.<string>} tags
 */


/**
 * 
 * @route GET /api/v1/anuncios
 * @group Anuncios - Operaciones sobre el anuncio
 * @returns {Anuncio.model} 200 - Lista de Anuncios
 * @returns {Error}  400 default - Mensaje de error
 */
router.get('/', (req, res) => {
  filteredQuery(req).exec((err, anuncios) => {
    if (err) {
      res.status(400).json({
        ok: false,
        error: err,
      });
    }
    res.status(200).json({
      ok: true,
      anuncios,
    });
  });
});

/**
 * 
 * @route POST /api/v1/anuncios
 * @param {Anuncio.model} anuncio.body.required 
 * @group Anuncios - Operaciones sobre el anuncio
 * @returns {object} 201 - Nuevo anuncio añadido
 * @returns {Error}  400 default - Mensaje de error
 */
router.post('/', (req, res) => {
  const nuevoAnuncio = new Anuncio(req.body);
  nuevoAnuncio.save((err, anuncio) => {
    if (err) {
      res.status(400).json({
        ok: false,
        error: err,
      });
    }
    res.status(201).json({
      ok: true,
      anuncio,
    });
  });
});

/**
 * 
 * @route GET /api/v1/anuncios/tags
 * @group Anuncios - Operaciones sobre el anuncio
 * @returns {Array.<string>} 200 - Lista de tags
 * @returns {Error}  400 default - Mensaje de error
 */
router.get('/tags', (req, res) => {
  Anuncio.find({}).distinct('tags', (err, tags) => {
    if (err) {
      res.status(400).json({
        ok: false,
        error: err,
      });
    }
    res.status(200).send(tags);
  });
});

module.exports = router;
