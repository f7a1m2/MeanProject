const express = require('express');
const router = express.Router();
const Produit = require('../models/Produit');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const { verifyToken } = require('../middleware/verifyToken');
const upload = multer({ storage: multer.memoryStorage() });
const PrixVenteProduit= require('../models/PrixVenteProduitParBoutique');
const MouvementProduit = require('../models/MouvementProduit');



function parsePagination(req) {
  const page = Number(req.query.page) || 0;
  const size = Number(req.query.size) || 10;
  return {page, size};
}

router.get('/', async (req, res) => {
  try {
    const {page, size} = parsePagination(req);
    const skip = page * size;
    const data = await Produit.find().skip(skip).limit(size).exec();
    const total = await Produit.countDocuments();
    res.status(200).json({status: 200, message: 'Produit retrieved successfully', data: {content: data, totalElements: total, totalPages: Math.ceil(total/size), pageNumber: page, pageSize: size}});
  } catch (err) {
    res.status(500).json({status:500, message: err.message});
  }
});



router.post('/search', async (req, res) => {
  try {
    const {page, size} = parsePagination(req);
    const skip = page * size;
    const filter = req.body || {};
    const data = await Produit.find(filter).skip(skip).limit(size).exec();
    const total = await Produit.countDocuments(filter);
    res.status(201).json({status:200, message: 'Produits retrieved successfully', data: {content: data, totalElements: total, totalPages: Math.ceil(total/size), pageNumber: page, pageSize: size}});
  } catch (err) {
    res.status(500).json({status:500, message: err.message});
  }
});

// router.post('/', async (req, res) => {
//   try{
//     const p = new Produit(req.body);
//     const saved = await p.save();
//     res.status(201).json({status:201, message: 'Produit saved successfully', data: saved});
//   }catch(err){
//     res.status(500).json({status:500, message: err.message});
//   }
// });

router.put('/:id', async (req, res) => {
  try{
    const updated = await Produit.findByIdAndUpdate(req.params.id, req.body, {new:true}).exec();
    if(!updated) return res.status(404).json({status:404, message: 'Produit not found'});
    res.status(200).json({status:200, message: 'Produit updated successfully', data: updated});
  }catch(err){
    res.status(500).json({status:500, message: err.message});
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const d = await Produit.findByIdAndDelete(req.params.id).exec();
    if(!d) return res.status(404).json({status:404, message: 'Produit not found'});
    res.status(200).json({status:200, message: 'Produit deleted successfully', data: null});
  }catch(err){
    res.status(500).json({status:500, message: err.message});
  }
});

router.post('/',verifyToken, upload.single('image'), async (req, res) => {
  try {

    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "produits" },
        async (error, result) => {
          if (error) return res.status(500).json(error);

          imageUrl = result.secure_url;

          const produit = new Produit({
            designation: req.body.designation,
            typeProduit: req.body.typeProduit,
            utilisateur: req.user.id,
            image: imageUrl
          });

          await produit.save();
          res.json(produit);
        }
      );

      result.end(req.file.buffer);
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route pour récupérer les produits avec leur dernier prix de vente
router.get('/with-prix', async (req, res) => {
  try {
    // On récupère tous les produits
    const produits = await Produit.find().lean();

    // Pour chaque produit, on récupère le dernier prix
    const produitsAvecPrix = await Promise.all(
      produits.map(async produit => {
        const dernierPrix = await PrixVenteProduit.findOne({ produit: produit._id })
                              .sort({ createdAt: -1 }) // dernier prix
                              .lean();
        return {
          ...produit,
          dernierPrix: dernierPrix ? dernierPrix.prixVente : null
        };
      })
    );

    res.json({ status: 200, message: "Produits avec prix récupérés", data: produitsAvecPrix });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Erreur serveur", err });
  }
});

// Route pour récupérer les produits avec leur dernier prix de vente et stock actuel
router.get('/with-prix2', async (req, res) => {
  try {
    // On récupère tous les produits
    const produits = await Produit.find().lean();

    const produitsAvecPrix = await Promise.all(
      produits.map(async produit => {

        // 🔹 Dernier prix
        const dernierPrix = await PrixVenteProduit.findOne({ produit: produit._id })
                              .sort({ createdAt: -1 })
                              .lean();

        // 🔹 Calcul du stock (entrees - sorties)
        const mouvements = await MouvementProduit.aggregate([
          { $match: { produit: produit._id } },
          {
            $group: {
              _id: "$typesMouvement",
              totalQuantite: { $sum: "$quantite" }
            }
          }
        ]);

        let totalEntree = 0;
        let totalSortie = 0;

        mouvements.forEach(m => {
          if (m._id === 1) totalEntree = m.totalQuantite;
          if (m._id === 2) totalSortie = m.totalQuantite;
        });

        const stockActuel = totalEntree - totalSortie;

        return {
          ...produit,
          dernierPrix: dernierPrix ? dernierPrix.prixVente : null,
          stockActuel
        };
      })
    );

    res.json({
      status: 200,
      message: "Produits avec prix et stock récupérés",
      data: produitsAvecPrix
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: "Erreur serveur",
      err
    });
  }
});





















// Route pour récupérer un produit par ID
router.get('/:id', async (req, res) => {
  try{
    const p = await Produit.findById(req.params.id).exec();
    if(!p) return res.status(404).json({status:404, message: 'Produit not found'});
    res.status(200).json({status:200, message: 'Produit retrieved successfully', data: p});
  }catch(err){
    res.status(500).json({status:500, message: err.message});
  }
});


module.exports = router;
