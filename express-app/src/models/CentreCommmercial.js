const mongoose = require('mongoose');

const CentreSchema = new mongoose.Schema({
  nom: {type: String, required: true},
  adresse: {type: String, default: null}
}, {collection: 'centreCommmercial', timestamps: true});

module.exports = mongoose.model('CentreCommmercial', CentreSchema);
