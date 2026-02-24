const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UtilisateurSchema = new mongoose.Schema({
  username: {type: String, required: true},
  type: {type: String, default: "client"},
  solde: {type: Number, default: 0},
  password: {type: String, default: null}
}, {collection: 'utilisateur', timestamps: true});

// Hash password avant sauvegarde
UtilisateurSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


module.exports = mongoose.model('Utilisateur', UtilisateurSchema);
