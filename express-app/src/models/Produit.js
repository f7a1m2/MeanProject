const mongoose = require('mongoose');

const ProduitSchema = new mongoose.Schema({
  designation: {type: String, required: true},
  typeProduit: {type: String, required: true},
  utilisateur: {type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', default: null},
  image: {type: String, default: null}
}, {collection: 'Produit', timestamps: true});

module.exports = mongoose.model('Produit', ProduitSchema);
