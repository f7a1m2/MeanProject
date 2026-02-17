const mongoose = require('mongoose');

const SalleSchema = new mongoose.Schema({
  batiment: {type: mongoose.Schema.Types.ObjectId, ref: 'Batiment', default: null},
  numeroSalle: {type: String, required: true},
  numeroEtage: {type: Number, default: null},
  espaceUtiliser: {type: Number, required: true},
  cout: {type: Number, required: true},
  typesalle: {type: mongoose.Schema.Types.ObjectId, ref: 'TypeSalle', default: null},
  disponibiliterStatus: {type: mongoose.Schema.Types.ObjectId, ref: 'Statu', default: null}
}, {collection: 'Salle', timestamps: true});

module.exports = mongoose.model('Salle', SalleSchema);
