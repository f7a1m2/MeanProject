require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDb = require('./db');
const jwt = require('jsonwebtoken');

const produitRouter = require('./routes/produit');
const salleRouter = require('./routes/salle');
const batimentRouter = require('./routes/batiment');
const typeProduitRouter = require('./routes/typeProduit');
const typeSalleRouter = require('./routes/typeSalle');
const typeBatimentRouter = require('./routes/typeBatiment');
const centreRouter = require('./routes/centreCommmercial');
const utilisateurRouter = require('./routes/utilisateur');
const statuRouter = require('./routes/statu');
const mouvementProduitRouter = require('./routes/mouvementProduit');
const historiqueSalleRouter = require('./routes/historiqueSalle');
const prixVenteProduitRouter = require('./routes/prixVenteProduitParBoutique');
const transactionSoldeRouter = require('./routes/transactionSolde');
const salleBoutiqueRouter = require('./routes/salleBoutique');
const adminRouter = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.json());

app.use('/produit', produitRouter);
app.use('/salle', salleRouter);
app.use('/batiment', batimentRouter);
app.use('/typeProduit', typeProduitRouter);
app.use('/typeSalle', typeSalleRouter);
app.use('/typeBatiment', typeBatimentRouter);
app.use('/centreCommmercial', centreRouter);
app.use('/utilisateur', utilisateurRouter);
app.use('/statu', statuRouter);
app.use('/mouvementProduit', mouvementProduitRouter);
app.use('/historiqueSalle', historiqueSalleRouter);
app.use('/prixVenteProduitParBoutique', prixVenteProduitRouter);
app.use('/transactionSolde', transactionSoldeRouter);
app.use('/salleBoutique', salleBoutiqueRouter);
app.use('/admin', adminRouter);

// error handler (last middleware)
const errorHandler = require('./utils/errorHandler');
app.use(errorHandler);


const PORT = process.env.PORT || 3000;

connectDb()
  .then(() => {
    console.log('✓ MongoDB connected successfully');
  })
  .catch((err) => {
    console.warn('⚠ MongoDB connection failed. Running in offline mode.');
    console.warn(`  Error: ${err.message}`);
  })
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`✓ Express server listening on port ${PORT}`);
    });
  });

// 🔹 Middleware protection
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


// 🔹 Route protégée
app.get('/', verifyToken, (req, res) => {
  res.json({ message: 'Bienvenue connecté !' });
});

// checkRole middleware
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès refusé' });
    }
    next();
  };
};

// lien entre rôle et route

app.get('/admin', verifyToken, checkRole(['admin']), (req, res) => {
  res.json({ message: 'Bienvenue Admin' });
});

app.get('/client', verifyToken, checkRole(['client']), (req, res) => {
  res.json({ message: 'Bienvenue Client' });
});

app.get('/boutique', verifyToken, checkRole(['boutique']), (req, res) => {
  res.json({ message: 'Bienvenue Boutique' });
});

// route pour récupérer les infos de l'utilisateur connecté
const Utilisateur = require('./models/Utilisateur');

app.get('/me', verifyToken, async (req, res) => {
  const user = await Utilisateur.findById(req.user.id).select('-password');
  res.json(user);
});


module.exports = app;
