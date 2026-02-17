const mongoose = require('mongoose');

const HistoriqueSalleSchema = new mongoose.Schema({
  dateDebut: {type: Date, default: Date.now},
  dateFin: {type: Date, default: Date.now},
  statut: {type: mongoose.Schema.Types.ObjectId, ref: 'Statu', default: null},
  salle: {type: mongoose.Schema.Types.ObjectId, ref: 'Salle', default: null},
  utilisateur: {type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', default: null},
  revenuGenerer: {type: Number, default: 0}
}, {collection: 'historiqueSalle', timestamps: true});

module.exports = mongoose.model('HistoriqueSalle', HistoriqueSalleSchema);
