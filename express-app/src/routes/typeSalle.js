const express = require('express');
const router = express.Router();
const TypeSalle = require('../models/TypeSalle');

function parsePagination(req) { const page = Number(req.query.page) || 0; const size = Number(req.query.size) || 10; return {page, size}; }

router.get('/', async (req, res) => {
  try { const {page, size} = parsePagination(req); const skip = page * size; const data = await TypeSalle.find().skip(skip).limit(size).exec(); const total = await TypeSalle.countDocuments(); res.status(200).json({status:200, message:'TypeSalle retrieved successfully', data:{content:data, totalElements:total, totalPages:Math.ceil(total/size), pageNumber:page, pageSize:size}}); } catch(err){ res.status(500).json({status:500, message:err.message}); }
});

router.get('/:id', async (req,res)=>{ try{ const d=await TypeSalle.findById(req.params.id).exec(); if(!d) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'TypeSalle retrieved successfully',data:d}); }catch(err){res.status(500).json({status:500,message:err.message});}});

router.post('/', async (req,res)=>{ try{ const obj=new TypeSalle(req.body); const s=await obj.save(); res.status(201).json({status:201,message:'TypeSalle saved successfully',data:s}); }catch(err){res.status(500).json({status:500,message:err.message});}});

router.put('/:id', async (req,res)=>{ try{ const u=await TypeSalle.findByIdAndUpdate(req.params.id, req.body, {new:true}).exec(); if(!u) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'TypeSalle updated successfully',data:u}); }catch(err){res.status(500).json({status:500,message:err.message});}});

router.delete('/:id', async (req,res)=>{ try{ const d=await TypeSalle.findByIdAndDelete(req.params.id).exec(); if(!d) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'TypeSalle deleted successfully',data:null}); }catch(err){res.status(500).json({status:500,message:err.message});}});

module.exports = router;
