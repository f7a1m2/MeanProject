const mongoose = require('mongoose');

const MouvementProduitSchema = new mongoose.Schema({
  quantite: {type: Number, required: true},
  dateEntree: {type: Date, default: Date.now},
  dateSortie: {type: Date, default: null},
  typesMouvement: {type: String, default: null},
  produitProduit: {type: mongoose.Schema.Types.ObjectId, ref: 'Produit', default: null}
}, {collection: 'mouvementProduit', timestamps: true});

module.exports = mongoose.model('MouvementProduit', MouvementProduitSchema);
