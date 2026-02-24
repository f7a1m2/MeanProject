const mongoose = require('mongoose');

const StatuSchema = new mongoose.Schema({
  designation: {type: String, required: true}
}, {collection: 'statu', timestamps: true});

module.exports = mongoose.model('Statu', StatuSchema);
