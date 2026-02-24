const mongoose = require('mongoose');

const TransactionSoldeSchema = new mongoose.Schema({
  montant: {type: Number, required: true},
  dateTransaction: {type: Date, default: Date.now},
  typeTransaction: {type: String, default: null},
  utilisateur: {type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', default: null}
}, {collection: 'transactionSolde', timestamps: true});

module.exports = mongoose.model('TransactionSolde', TransactionSoldeSchema);
