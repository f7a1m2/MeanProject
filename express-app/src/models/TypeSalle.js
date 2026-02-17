const mongoose = require('mongoose');

const TypeSalleSchema = new mongoose.Schema({
  nom: {type: String, required: true}
}, {collection: 'typeSalle', timestamps: true});

module.exports = mongoose.model('TypeSalle', TypeSalleSchema);
