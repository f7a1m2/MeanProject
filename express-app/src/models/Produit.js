const mongoose = require('mongoose');

const ProduitSchema = new mongoose.Schema({
  designation: {type: String, required: true},
  typeProduit: {type: mongoose.Schema.Types.ObjectId, ref: 'TypeProduit', default: null}
}, {collection: 'Produit', timestamps: true});

module.exports = mongoose.model('Produit', ProduitSchema);
