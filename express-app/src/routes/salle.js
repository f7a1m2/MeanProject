const express = require('express');
const router = express.Router();
const Salle = require('../models/Salle');

function parsePagination(req) {
  const page = Number(req.query.page) || 0;
  const size = Number(req.query.size) || 10;
  return {page, size};
}

router.get('/', async (req, res) => {
  try {
    const {page, size} = parsePagination(req);
    const skip = page * size;
    const data = await Salle.find().skip(skip).limit(size).populate('batimentBatiment typesalleTypeSalle disponibiliterStatus').exec();
    const total = await Salle.countDocuments();
    res.status(200).json({status: 200, message: 'Salle retrieved successfully', data: {content: data, totalElements: total, totalPages: Math.ceil(total/size), pageNumber: page, pageSize: size}});
  } catch (err) {
    res.status(500).json({status:500, message: err.message});
  }
});

router.get('/:id', async (req, res) => {
  try{
    const s = await Salle.findById(req.params.id).populate('batimentBatiment typesalleTypeSalle disponibiliterStatus').exec();
    if(!s) return res.status(404).json({status:404, message: 'Salle not found'});
    res.status(200).json({status:200, message: 'Salle retrieved successfully', data: s});
  }catch(err){
    res.status(500).json({status:500, message: err.message});
  }
});

router.post('/search', async (req, res) => {
  try {
    const {page, size} = parsePagination(req);
    const skip = page * size;
    const filter = req.body || {};
    const data = await Salle.find(filter).skip(skip).limit(size).populate('batimentBatiment typesalleTypeSalle disponibiliterStatus').exec();
    const total = await Salle.countDocuments(filter);
    res.status(201).json({status:200, message: 'Salles retrieved successfully', data: {content: data, totalElements: total, totalPages: Math.ceil(total/size), pageNumber: page, pageSize: size}});
  } catch (err) {
    res.status(500).json({status:500, message: err.message});
  }
});

router.post('/', async (req, res) => {
  try{
    const s = new Salle(req.body);
    const saved = await s.save();
    res.status(201).json({status:201, message: 'Salle saved successfully', data: saved});
  }catch(err){
    res.status(500).json({status:500, message: err.message});
  }
});

router.put('/:id', async (req, res) => {
  try{
    const updated = await Salle.findByIdAndUpdate(req.params.id, req.body, {new:true}).exec();
    if(!updated) return res.status(404).json({status:404, message: 'Salle not found'});
    res.status(200).json({status:200, message: 'Salle updated successfully', data: updated});
  }catch(err){
    res.status(500).json({status:500, message: err.message});
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const d = await Salle.findByIdAndDelete(req.params.id).exec();
    if(!d) return res.status(404).json({status:404, message: 'Salle not found'});
    res.status(200).json({status:200, message: 'Salle deleted successfully', data: null});
  }catch(err){
    res.status(500).json({status:500, message: err.message});
  }
});

module.exports = router;
