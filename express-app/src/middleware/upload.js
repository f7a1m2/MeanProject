const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // ton config

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'produits',       // dossier sur Cloudinary
    allowed_formats: ['jpg','png','jpeg'],
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
