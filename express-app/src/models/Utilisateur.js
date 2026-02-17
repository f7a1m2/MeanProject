const mongoose = require('mongoose');

const UtilisateurSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, default: null},
  password: {type: String, default: null}
}, {collection: 'utilisateur', timestamps: true});

module.exports = mongoose.model('Utilisateur', UtilisateurSchema);
