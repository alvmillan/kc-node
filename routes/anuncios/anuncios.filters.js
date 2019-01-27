const mongoose = require('mongoose');

const Anuncio = mongoose.model('anuncio');

module.exports = (req) => {
  const query = Anuncio.find({});
  const pageOptions = {
    page: req.query.page || 0,
    limit: parseInt(req.query.limit, 10) || 6,
  };

  if (req.query.tag) {
    query.where('tags').in(req.query.tag);
  }

  if (req.query.venta) {
    query.where('venta').equals(req.query.venta);
  }

  if (req.query.nombre) {
    const expression = new RegExp(`^${req.query.nombre}`, 'i');
    query.where('nombre').regex(expression);
  }

  if (req.query.precio) {
    const res = req.query.precio.split('-');
    if (res.length === 1) {
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

  query.skip(pageOptions.page * pageOptions.limit);
  query.limit(pageOptions.limit);

  return query;
};
