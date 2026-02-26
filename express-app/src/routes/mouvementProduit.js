const express = require('express');
const router = express.Router();
const MouvementProduit = require('../models/MouvementProduit');
const { verifyToken } = require('../middleware/verifyToken');
const Produit = require('../models/Produit');
const PrixVenteProduitParBoutique = require('../models/PrixVenteProduitParBoutique');
const Utilisateur = require('../models/Utilisateur');
const TransactionSolde = require('../models/TransactionSolde');


const parsePagination = (req) => {const page = Number(req.query.page) || 0; const size = Number(req.query.size) || 10; return {page, size};};

router.get('/', async (req, res) => {try {const {page, size} = parsePagination(req); const skip = page * size; const data = await MouvementProduit.find().skip(skip).limit(size).populate('produitProduit').exec(); const total = await MouvementProduit.countDocuments(); res.status(200).json({status:200, message:'MouvementProduit retrieved successfully', data:{content:data, totalElements:total, totalPages:Math.ceil(total/size), pageNumber:page, pageSize:size}});} catch(err){ res.status(500).json({status:500, message:err.message});}});

router.get('/:id', async (req,res)=>{ try{ const d=await MouvementProduit.findById(req.params.id).populate('produitProduit').exec(); if(!d) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'MouvementProduit retrieved successfully',data:d});}catch(err){res.status(500).json({status:500,message:err.message});}});

router.post('/', async (req,res)=>{ try{ const obj=new MouvementProduit(req.body); const s=await obj.save(); res.status(201).json({status:201,message:'MouvementProduit saved successfully',data:s});}catch(err){res.status(500).json({status:500,message:err.message});}});

router.put('/:id', async (req,res)=>{ try{ const u=await MouvementProduit.findByIdAndUpdate(req.params.id, req.body, {new:true}).exec(); if(!u) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'MouvementProduit updated successfully',data:u});}catch(err){res.status(500).json({status:500,message:err.message});}});

router.delete('/:id', async (req,res)=>{ try{ const d=await MouvementProduit.findByIdAndDelete(req.params.id).exec(); if(!d) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'MouvementProduit deleted successfully',data:null});}catch(err){res.status(500).json({status:500,message:err.message});}});

// Route pour enregistrer une entrée de produit
router.post('/entree', verifyToken, async (req, res) => {
  try {
    const { produitId, quantite, prixUnitaire } = req.body;

    if (!produitId || !quantite || !prixUnitaire) {
      return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    const mouvement = new MouvementProduit({
      quantite,
      prixUnitaire,
      dateMouvement: new Date(),
      typesMouvement: 1, // ✅ 1 = ENTREE
      produit: produitId,
      UtilisateurBoutique: req.user.id
    });

    await mouvement.save();

    res.status(201).json({
      message: "Entrée produit enregistrée",
      mouvement
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", err });
  }
});



// Route pour enregistrer un achat / sortie de produit et créer transaction
router.post('/achat', verifyToken, async (req, res) => {
  // console.log("Achat request user:", req.user);
   try {
    //  console.log("Achat request user:", req.user);
    const { produitId, quantite,stockActuel } = req.body;

    if (!produitId || !quantite) {
      return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    //  Récupérer le produit pour son prix
    const produit = await Produit.findById(produitId);
    if (!produit) return res.status(404).json({ message: "Produit non trouvé" });

    //  Récupérer le dernier prix
    const dernierPrix = await PrixVenteProduitParBoutique.findOne({ produit: produitId })
                              .sort({ createdAt: -1 });
                              // console.log(`Dernier prix pour produit ${produitId}:`, dernierPrix);
    if (!dernierPrix) return res.status(400).json({ message: "Prix du produit non défini" });

    //  Vérifier le stock
    
    // console.log(`Stock actuel pour produit ${produitId}: ${stockActuel}`);
    if (quantite > stockActuel) {
      return res.status(400).json({ message: "Quantité supérieure au stock disponible" });
    }

    //  Vérifier le solde du client
    const client = await Utilisateur.findById(req.user.id);
    const totalPrix = dernierPrix.prixVente * quantite;
    if (client.solde < totalPrix) {
      return res.status(400).json({ message: "Solde insuffisant" });
    }
    // console.log(`Client ${client.nom} solde: ${client.solde}, total prix: ${totalPrix}`);

    // 🔹 Créer le mouvement de sortie
    const mouvement = new MouvementProduit({
      quantite,
      prixUnitaire: dernierPrix.prixVente,
      dateMouvement: new Date(),
      typesMouvement: 2, // 2 = SORTIE
      produit: produitId,
      UtilisateurDestinataire: req.user.id
    });
    await mouvement.save();

    // 🔹 Mettre à jour le solde du client
    client.solde -= totalPrix;
    await client.save();

    // 🔹 Créer la transaction de solde
    const transaction = new TransactionSolde({
      montant: totalPrix,
      typeTransaction: 2, // 2 = sortie / achat
      utilisateur: req.user.id
    });
    await transaction.save();

    res.status(201).json({
      message: "Achat effectué avec succès",
      mouvement,
      soldeRestant: client.solde
    });

  // 
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", err });
  }
});



module.exports = router;
