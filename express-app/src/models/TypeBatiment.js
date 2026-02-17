const mongoose = require('mongoose');

const TypeBatimentSchema = new mongoose.Schema({
  nom: {type: String, required: true}
}, {collection: 'typeBatiment', timestamps: true});

module.exports = mongoose.model('TypeBatiment', TypeBatimentSchema);
