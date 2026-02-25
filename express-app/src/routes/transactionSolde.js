const express = require('express');
const router = express.Router();
const TransactionSolde = require('../models/TransactionSolde');
const Utilisateur = require('../models/Utilisateur');
const { verifyToken } = require('../middleware/verifyToken');


const parsePagination = (req) => {const page = Number(req.query.page) || 0; const size = Number(req.query.size) || 10; return {page, size};};

router.get('/', async (req, res) => {try {const {page, size} = parsePagination(req); const skip = page * size; const data = await TransactionSolde.find().skip(skip).limit(size).populate('utilisateurUtilisateur').exec(); const total = await TransactionSolde.countDocuments(); res.status(200).json({status:200, message:'TransactionSolde retrieved successfully', data:{content:data, totalElements:total, totalPages:Math.ceil(total/size), pageNumber:page, pageSize:size}});} catch(err){ res.status(500).json({status:500, message:err.message});}});

router.get('/:id', async (req,res)=>{ try{ const d=await TransactionSolde.findById(req.params.id).populate('utilisateurUtilisateur').exec(); if(!d) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'TransactionSolde retrieved successfully',data:d});}catch(err){res.status(500).json({status:500,message:err.message});}});

router.post('/', async (req,res)=>{ try{ const obj=new TransactionSolde(req.body); const s=await obj.save(); res.status(201).json({status:201,message:'TransactionSolde saved successfully',data:s});}catch(err){res.status(500).json({status:500,message:err.message});}});

router.put('/:id', async (req,res)=>{ try{ const u=await TransactionSolde.findByIdAndUpdate(req.params.id, req.body, {new:true}).exec(); if(!u) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'TransactionSolde updated successfully',data:u});}catch(err){res.status(500).json({status:500,message:err.message});}});

router.delete('/:id', async (req,res)=>{ try{ const d=await TransactionSolde.findByIdAndDelete(req.params.id).exec(); if(!d) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'TransactionSolde deleted successfully',data:null});}catch(err){res.status(500).json({status:500,message:err.message});}});




router.post('/recharger', verifyToken, async (req, res) => {
  try {
    const { montant } = req.body;

    if (!montant || montant <= 0) {
      return res.status(400).json({ message: "Montant invalide" });
    }

    // 🔹 Créer transaction type 1 (entrée)
    const transaction = new TransactionSolde({
      montant,
      typeTransaction: 1,
      utilisateur: req.user.id
    });

    await transaction.save();

    // 🔹 Mettre à jour le solde utilisateur
    const utilisateur = await Utilisateur.findById(req.user.id);

    utilisateur.solde += montant;
    await utilisateur.save();

    res.json({
      message: "Solde rechargé avec succès",
      nouveauSolde: utilisateur.solde
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", err });
  }
});




module.exports = router;
