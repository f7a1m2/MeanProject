const mongoose = require('mongoose');

module.exports = function connectDb() {
  const url = process.env.DB_URL || 'mongodb://localhost:27017/meancrud';
  return mongoose.connect(url, {
    // options left default for mongoose v7
  });
};
