const mongoose = require('mongoose');

const BatimentSchema = new mongoose.Schema({
  designation: {type: String, required: true},
  centrecommercial: {type: mongoose.Schema.Types.ObjectId, ref: 'CentreCommmercial', default: null},
  typebatiment: {type: mongoose.Schema.Types.ObjectId, ref: 'TypeBatiment', default: null},
  nbrEtage: {type: Number, required: true},
  surfaceEtage: {type: Number, required: true}
}, {collection: 'batiment', timestamps: true});

module.exports = mongoose.model('Batiment', BatimentSchema);
