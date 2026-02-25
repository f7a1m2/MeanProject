const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Utilisateur = require('../models/Utilisateur');

function parsePagination(req) { const page = Number(req.query.page) || 0; const size = Number(req.query.size) || 10; return {page, size}; }

router.get('/', async (req, res) => {
  try { const {page, size} = parsePagination(req); const skip = page * size; const data = await Utilisateur.find().skip(skip).limit(size).exec(); const total = await Utilisateur.countDocuments(); res.status(200).json({status:200, message:'Utilisateur retrieved successfully', data:{content:data, totalElements:total, totalPages:Math.ceil(total/size), pageNumber:page, pageSize:size}}); } catch(err){ res.status(500).json({status:500, message:err.message}); }
});

router.get('/:id', async (req,res)=>{ try{ const d=await Utilisateur.findById(req.params.id).exec(); if(!d) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'Utilisateur retrieved successfully',data:d}); }catch(err){res.status(500).json({status:500,message:err.message});}});

router.post('/', async (req, res) => {
  try {

    // 🔹 Si ce n'est PAS l'utilisateur d'initialisation
    if (req.body.username !== "box") {
      if (req.body.idCentre === "") {
        req.body.idCentre = null;
      }
    }

    const obj = new Utilisateur(req.body);
    const s = await obj.save();

    res.status(201).json({
      status: 201,
      message: 'Utilisateur saved successfully',
      data: s
    });

  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

router.put('/:id', async (req,res)=>{ try{ const u=await Utilisateur.findByIdAndUpdate(req.params.id, req.body, {new:true}).exec(); if(!u) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'Utilisateur updated successfully',data:u}); }catch(err){res.status(500).json({status:500,message:err.message});}});

router.delete('/:id', async (req,res)=>{ try{ const d=await Utilisateur.findByIdAndDelete(req.params.id).exec(); if(!d) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'Utilisateur deleted successfully',data:null}); }catch(err){res.status(500).json({status:500,message:err.message});}});

// 🔹 LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await Utilisateur.findOne({ username });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Wrong password' });

  const token = jwt.sign(
    { id: user._id, role: user.type }, // 👈 role dans le token
    "SECRET_KEY",
    { expiresIn: '1d' }
  );

  res.json({
    token,
    role: user.type
  });
});







module.exports = router;
