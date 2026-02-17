const mongoose = require('mongoose');

const TypeProduitSchema = new mongoose.Schema({
  designation: {type: String, required: true}
}, {collection: 'typeProduit', timestamps: true});

module.exports = mongoose.model('TypeProduit', TypeProduitSchema);
