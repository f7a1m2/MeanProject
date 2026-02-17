const mongoose = require('mongoose');

const SalleBoutiqueSchema = new mongoose.Schema({
  numeroSalleBoutique: {type: String, required: true},
  saleSalle: {type: mongoose.Schema.Types.ObjectId, ref: 'Salle', default: null}
}, {collection: 'salleBoutique', timestamps: true});

module.exports = mongoose.model('SalleBoutique', SalleBoutiqueSchema);
