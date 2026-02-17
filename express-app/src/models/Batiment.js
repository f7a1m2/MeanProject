const mongoose = require('mongoose');

const BatimentSchema = new mongoose.Schema({
  nom: {type: String, required: true},
  centrecommercialCentreCommmercial: {type: mongoose.Schema.Types.ObjectId, ref: 'CentreCommmercial', default: null},
  typebatimentTypeBatiment: {type: mongoose.Schema.Types.ObjectId, ref: 'TypeBatiment', default: null},
  nbrEtage: {type: Number, required: true},
  surfaceEtage: {type: Number, required: true}
}, {collection: 'batiment', timestamps: true});

module.exports = mongoose.model('Batiment', BatimentSchema);
