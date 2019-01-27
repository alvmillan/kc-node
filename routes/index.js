const express = require('express');

const router = express.Router();

/**
 * 
 * @route GET /
 * @group Vistas - Operaciones sobre las vistas
 * @returns {template} 200 - Vista Index
 * @returns {Error}  400 default - Mensaje de error
 */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
