const mongoose = require('mongoose');

const TypeProduitSchema = new mongoose.Schema({
  nom: {type: String, required: true}
}, {collection: 'typeProduit', timestamps: true});

module.exports = mongoose.model('TypeProduit', TypeProduitSchema);
