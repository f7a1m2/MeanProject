const express = require('express');
const router = express.Router();
const Centre = require('../models/CentreCommercial');

function parsePagination(req) { const page = Number(req.query.page) || 0; const size = Number(req.query.size) || 10; return {page, size}; }

router.get('/', async (req, res) => {
  try { const {page, size} = parsePagination(req); const skip = page * size; const data = await Centre.find().skip(skip).limit(size).exec(); const total = await Centre.countDocuments(); res.status(200).json({status:200, message:'CentreCommmercial retrieved successfully', data:{content:data, totalElements:total, totalPages:Math.ceil(total/size), pageNumber:page, pageSize:size}}); } catch(err){ res.status(500).json({status:500, message:err.message}); }
});

router.get('/:id', async (req,res)=>{ try{ const d=await Centre.findById(req.params.id).exec(); if(!d) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'CentreCommmercial retrieved successfully',data:d}); }catch(err){res.status(500).json({status:500,message:err.message});}});

router.post('/', async (req,res)=>{ try{ const obj=new Centre(req.body); const s=await obj.save(); res.status(201).json({status:201,message:'Centre saved successfully',data:s}); }catch(err){res.status(500).json({status:500,message:err.message});}});

router.put('/:id', async (req,res)=>{ try{ const u=await Centre.findByIdAndUpdate(req.params.id, req.body, {new:true}).exec(); if(!u) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'Centre updated successfully',data:u}); }catch(err){res.status(500).json({status:500,message:err.message});}});

router.delete('/:id', async (req,res)=>{ try{ const id = req.params.id.trim(); const d=await Centre.findByIdAndDelete(id).exec(); if(!d) return res.status(404).json({status:404,message:'Not found'}); res.status(200).json({status:200,message:'Centre deleted successfully',data:null}); }catch(err){res.status(500).json({status:500,message:err.message});}});

module.exports = router;
