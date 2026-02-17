const mongoose = require('mongoose');

const PrixVenteProduitSchema = new mongoose.Schema({
  prixVente: {type: Number, required: true},
  produitProduit: {type: mongoose.Schema.Types.ObjectId, ref: 'Produit', default: null},
  salleBoutiqueSalleBoutique: {type: mongoose.Schema.Types.ObjectId, ref: 'SalleBoutique', default: null}
}, {collection: 'prixVenteProduitParBoutique', timestamps: true});

module.exports = mongoose.model('PrixVenteProduitParBoutique', PrixVenteProduitSchema);
