const fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/anuncios/:img', function(req, res, next) {
    const img = req.params.img;
    const path = `${__dirname}/../public/images/${img}`;

    fs.exists(path, exists => {
        res.sendFile(img, { root: __dirname + '/../public/images'});
    })
  });
  
module.exports = router;