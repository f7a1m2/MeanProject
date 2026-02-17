const mongoose = require('mongoose');

const UtilisateurSchema = new mongoose.Schema({
  username: {type: String, required: true},
  type: {type: String, default: null},
  solde: {type: Number, default: 0},
  password: {type: String, default: null}
}, {collection: 'utilisateur', timestamps: true});

module.exports = mongoose.model('Utilisateur', UtilisateurSchema);
