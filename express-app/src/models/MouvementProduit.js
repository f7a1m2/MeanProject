const mongoose = require('mongoose');

const MouvementProduitSchema = new mongoose.Schema({
  quantite: {type: Number, required: true},
  dateMouvement: {type: Date, required: true},
  typesMouvement: {type: Number, default: null},
  prixUnitaire: {type: Number, required: true},
  salleBoutique: {type: mongoose.Schema.Types.ObjectId, ref: 'SalleBoutique', default: null},
  UtilisateurDestinataire: {type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', default: null},
  produit: {type: mongoose.Schema.Types.ObjectId, ref: 'Produit', default: null}
}, {collection: 'mouvementProduit', timestamps: true});

module.exports = mongoose.model('MouvementProduit', MouvementProduitSchema);
