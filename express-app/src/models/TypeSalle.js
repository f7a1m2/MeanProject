const mongoose = require('mongoose');

const TypeSalleSchema = new mongoose.Schema({
  designation: {type: String, required: true}
}, {collection: 'typeSalle', timestamps: true});

module.exports = mongoose.model('TypeSalle', TypeSalleSchema);
