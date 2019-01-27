const express = require('express');

const router = express.Router();
const filteredQuery = require('./anuncios.filters');

/**
 * 
 * @route GET /anuncios
 * @group Vistas - Operaciones sobre las vistas
 * @returns {template} 200 - Vista Anuncio
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
    res.render('anuncio', { anuncios });
  });
});

module.exports = router;
