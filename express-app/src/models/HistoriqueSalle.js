const mongoose = require('mongoose');

const HistoriqueSalleSchema = new mongoose.Schema({
  dateMouvement: {type: Date, default: Date.now},
  anciendisponibiliterStatus: {type: String, default: null},
  nouveldisponibiliterStatus: {type: String, default: null},
  saleSalle: {type: mongoose.Schema.Types.ObjectId, ref: 'Salle', default: null}
}, {collection: 'historiqueSalle', timestamps: true});

module.exports = mongoose.model('HistoriqueSalle', HistoriqueSalleSchema);
