const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ message: 'No token' });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'SECRET_KEY', (err, decoded) => { // 👈 jwt est maintenant défini
    if (err) return res.status(401).json({ message: 'Invalid token' });

    req.user = decoded; // { id: ..., type: ... }
    next();
  });
};

module.exports = { verifyToken };
