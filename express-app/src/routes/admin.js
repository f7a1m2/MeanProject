const express = require('express');
const router = express.Router();
const CentreCommmercial = require('../models/CentreCommercial');
const Batiment = require('../models/Batiment');
const TypeBatiment = require('../models/TypeBatiment');

// POST /admin/centre-commercial-complet
// Créer un centre commercial complet avec ses bâtiments et leurs types
router.post('/centre-commercial-complet', async (req, res) => {
  try {
    const { centreCommercial, batiments } = req.body;

    // Validation de base
    if (!centreCommercial || !centreCommercial.nom) {
      return res.status(400).json({
        status: 400,
        message: 'Centre commercial requis avec au moins un nom'
      });
    }

    if (!batiments || !Array.isArray(batiments) || batiments.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'Au moins un bâtiment requis'
      });
    }

    // Démarrer une session MongoDB pour la transaction
    const session = await CentreCommmercial.startSession();
    session.startTransaction();

    try {
      // 1. Créer le centre commercial
      const nouveauCentre = new CentreCommmercial({
        nom: centreCommercial.nom,
        adresse: centreCommercial.adresse || null
      });

      const centreSauvegarde = await nouveauCentre.save({ session });
      console.log('Centre commercial créé:', centreSauvegarde._id);

      // 2. Traiter chaque bâtiment
      const batimentsCrees = [];

      for (const batimentData of batiments) {
        // Validation du bâtiment
        if (!batimentData.nom || !batimentData.nbrEtage || !batimentData.surfaceEtage || !batimentData.typeBatiment) {
          throw new Error(`Bâtiment invalide: ${JSON.stringify(batimentData)}`);
        }

        // 3. Créer ou récupérer le type de bâtiment
        let typeBatiment = await TypeBatiment.findOne({ nom: batimentData.typeBatiment }).session(session);
        if (!typeBatiment) {
          typeBatiment = new TypeBatiment({ nom: batimentData.typeBatiment });
          typeBatiment = await typeBatiment.save({ session });
          console.log('Type de bâtiment créé:', typeBatiment._id);
        }

        // 4. Créer le bâtiment
        const nouveauBatiment = new Batiment({
          nom: batimentData.nom,
          nbrEtage: batimentData.nbrEtage,
          surfaceEtage: batimentData.surfaceEtage,
          centrecommercialCentreCommmercial: centreSauvegarde._id,
          typebatimentTypeBatiment: typeBatiment._id
        });

        const batimentSauvegarde = await nouveauBatiment.save({ session });
        batimentsCrees.push({
          id: batimentSauvegarde._id,
          nom: batimentSauvegarde.nom,
          nbrEtage: batimentSauvegarde.nbrEtage,
          surfaceEtage: batimentSauvegarde.surfaceEtage,
          typeBatiment: typeBatiment.nom
        });

        console.log('Bâtiment créé:', batimentSauvegarde._id);
      }

      // 5. Commit de la transaction
      await session.commitTransaction();
      session.endSession();

      // 6. Réponse de succès
      res.status(201).json({
        status: 201,
        message: 'Centre commercial complet créé avec succès',
        data: {
          centreCommercial: {
            id: centreSauvegarde._id,
            nom: centreSauvegarde.nom,
            adresse: centreSauvegarde.adresse,
            createdAt: centreSauvegarde.createdAt
          },
          batiments: batimentsCrees,
          totalBatiments: batimentsCrees.length
        }
      });

    } catch (error) {
      // Rollback en cas d'erreur
      await session.abortTransaction();
      session.endSession();
      throw error;
    }

  } catch (err) {
    console.error('Erreur lors de la création du centre commercial complet:', err);
    res.status(500).json({
      status: 500,
      message: 'Erreur lors de la création du centre commercial complet',
      error: err.message
    });
  }
});

// GET /admin/centre-commercial-complet/:id
// Récupérer un centre commercial avec tous ses bâtiments
router.get('/centre-commercial-complet/:id', async (req, res) => {
  try {
    const centreId = req.params.id;

    // Récupérer le centre commercial
    const centre = await CentreCommmercial.findById(centreId);
    if (!centre) {
      return res.status(404).json({
        status: 404,
        message: 'Centre commercial non trouvé'
      });
    }

    // Récupérer tous les bâtiments du centre avec leurs types
    const batiments = await Batiment.find({ centrecommercialCentreCommmercial: centreId })
      .populate('typebatimentTypeBatiment', 'nom')
      .select('nom nbrEtage surfaceEtage typebatimentTypeBatiment createdAt');

    // Formater la réponse
    const batimentsFormates = batiments.map(b => ({
      id: b._id,
      nom: b.nom,
      nbrEtage: b.nbrEtage,
      surfaceEtage: b.surfaceEtage,
      typeBatiment: b.typebatimentTypeBatiment ? b.typebatimentTypeBatiment.nom : null,
      createdAt: b.createdAt
    }));

    res.status(200).json({
      status: 200,
      message: 'Centre commercial récupéré avec succès',
      data: {
        centreCommercial: {
          id: centre._id,
          nom: centre.nom,
          adresse: centre.adresse,
          createdAt: centre.createdAt
        },
        batiments: batimentsFormates,
        totalBatiments: batimentsFormates.length
      }
    });

  } catch (err) {
    console.error('Erreur lors de la récupération du centre commercial:', err);
    res.status(500).json({
      status: 500,
      message: 'Erreur lors de la récupération du centre commercial',
      error: err.message
    });
  }
});

module.exports = router;