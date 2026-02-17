require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectDb = require('./db');

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

const app = express();
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

module.exports = app;
