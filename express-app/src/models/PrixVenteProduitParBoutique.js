const mongoose = require('mongoose');

const PrixVenteProduitSchema = new mongoose.Schema({
  prixVente: {type: Number, required: true},
  produit: {type: mongoose.Schema.Types.ObjectId, ref: 'Produit', default: null},
  // Utilisateur: {type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', default: null},
  dateMiseAJour: {type: Date, default: null}
}, {collection: 'prixVenteProduitParBoutique', timestamps: true});

module.exports = mongoose.model('PrixVenteProduitParBoutique', PrixVenteProduitSchema);
