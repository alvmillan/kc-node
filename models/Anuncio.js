const mongoose = require('mongoose');
const {Schema} = mongoose;


const anuncioSchema = new Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

mongoose.model('anuncio', anuncioSchema);