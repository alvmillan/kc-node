const keys = require('../config/keys');
const { anuncios } = require('../fixtures/anuncios.json');
const mongoose = require('mongoose');

async function run() {
    mongoose.connect(keys.mongoURI);

    await mongoose.connection.dropDatabase();

    const Anuncio = mongoose.model('Anuncio', new mongoose.Schema({
        nombre: String,
        venta: Boolean,
        precio: Number,
        foto: String,
        tags: [String]
    }));

    await Anuncio.deleteMany({});
  
    await Anuncio.insertMany(anuncios);

}

run()
    .then(console.log('Database successfully created!'))
    .catch(err => console.error(err.stack));