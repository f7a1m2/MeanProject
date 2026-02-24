const express = require('express');
const router = express.Router();
const MouvementProduit = require('../models/MouvementProduit');
const { verifyToken } = require('../middleware/verifyToken');


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
module.exports = router;
