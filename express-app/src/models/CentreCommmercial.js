const mongoose = require('mongoose');

const CentreSchema = new mongoose.Schema({
  designation: {type: String, required: true},
  heure_ouverture: {type: String, default: null},
  heure_fermeture: {type: String, default: null}

}, {collection: 'centreCommmercial', timestamps: true});

module.exports = mongoose.model('CentreCommmercial', CentreSchema);
