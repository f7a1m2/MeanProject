const mongoose = require('mongoose');

const SalleBoutiqueSchema = new mongoose.Schema({
  numeroSalleBoutique: {type: String, required: true},
  salle: {type: mongoose.Schema.Types.ObjectId, ref: 'Salle', default: null},
    utilisateur: {type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', default: null},
    dateAllocation: {type: Date, default: null},

}, {collection: 'salleBoutique', timestamps: true});

module.exports = mongoose.model('SalleBoutique', SalleBoutiqueSchema);
