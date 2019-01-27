const fs = require('fs');
const express = require('express');

const router = express.Router();

router.get('/anuncios/:img', (req, res) => {
  const { img } = req.params;
  const path = `${__dirname}/../public/images/${img}`;

  fs.exists(path, () => {
    res.sendFile(img, { root: `${__dirname}/../public/images` });
  });
});

module.exports = router;
