const express = require('express');
const router = express.Router();
const Produit = require('../models/Produit');

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

router.get('/:id', async (req, res) => {
  try{
    const p = await Produit.findById(req.params.id).exec();
    if(!p) return res.status(404).json({status:404, message: 'Produit not found'});
    res.status(200).json({status:200, message: 'Produit retrieved successfully', data: p});
  }catch(err){
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

router.post('/', async (req, res) => {
  try{
    const p = new Produit(req.body);
    const saved = await p.save();
    res.status(201).json({status:201, message: 'Produit saved successfully', data: saved});
  }catch(err){
    res.status(500).json({status:500, message: err.message});
  }
});

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

module.exports = router;
