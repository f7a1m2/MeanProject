const express = require('express');
const router = express.Router();
const PrixVenteProduitParBoutique = require('../models/PrixVenteProduitParBoutique');

const parsePagination = (req) => {const page = Number(req.query.page) || 0; const size = Number(req.query.size) || 10; return {page, size};};

router.get('/', async (req, res) => {try {const {page, size} = parsePagination(req); const skip = page * size; const data = await PrixVenteProduitParBoutique.find().skip(skip).limit(size).populate('produitProduit salleBoutiqueSalleBoutique').exec(); const total = await PrixVenteProduitParBoutique.countDocuments(); res.status(200).json({status:200, message:'PrixVenteProduitParBoutique retrieved successfully', data:{content:data, totalElements:total, totalPages:Math.ceil(total/size), pageNumber:page, pageSize:size}});} catch(err){ res.status(500).json({status:500, message:err.message});}});

router.get('/:id', async (req,res)=>{ try{ const d=await PrixVenteProduitParBoutique.findById(req.params.id).populate('produitProduit salleBoutiqueSalleBoutique').exec(); if(!d) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'PrixVenteProduitParBoutique retrieved successfully',data:d});}catch(err){res.status(500).json({status:500,message:err.message});}});

// router.post('/', async (req,res)=>{ try{ const obj=new PrixVenteProduitParBoutique(req.body); const s=await obj.save(); res.status(201).json({status:201,message:'PrixVenteProduitParBoutique saved successfully',data:s});}catch(err){res.status(500).json({status:500,message:err.message});}});

router.put('/:id', async (req,res)=>{ try{ const u=await PrixVenteProduitParBoutique.findByIdAndUpdate(req.params.id, req.body, {new:true}).exec(); if(!u) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'PrixVenteProduitParBoutique updated successfully',data:u});}catch(err){res.status(500).json({status:500,message:err.message});}});

router.delete('/:id', async (req,res)=>{ try{ const d=await PrixVenteProduitParBoutique.findByIdAndDelete(req.params.id).exec(); if(!d) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'PrixVenteProduitParBoutique deleted successfully',data:null});}catch(err){res.status(500).json({status:500,message:err.message});}});


// Route pour ajouter un prix de vente à un produit
const { verifyToken } = require('../middleware/verifyToken');


router.post('/', verifyToken, async (req, res) => {
  try {
    const { produitId, prixVente } = req.body;

    if (!produitId || !prixVente) {
      return res.status(400).json({ message: "Produit et prix obligatoires" });
    }

    const prix = new PrixVenteProduitParBoutique({
      produit: produitId,
      prixVente,
        dateMiseAJour: Date.now()
    });

    await prix.save();

    res.status(201).json({ message: "Prix ajouté avec succès", prix });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", err });
  }
});

module.exports = router;
