const mongoose = require('mongoose');

const TypeBatimentSchema = new mongoose.Schema({
  designation: {type: String, required: true}
}, {collection: 'typeBatiment', timestamps: true});

module.exports = mongoose.model('TypeBatiment', TypeBatimentSchema);
