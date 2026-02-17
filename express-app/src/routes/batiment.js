const express = require('express');
const router = express.Router();
const Batiment = require('../models/Batiment');

function parsePagination(req) {
  const page = Number(req.query.page) || 0;
  const size = Number(req.query.size) || 10;
  return {page, size};
}

router.get('/', async (req, res) => {
  try {
    const {page, size} = parsePagination(req);
    const skip = page * size;
    const data = await Batiment.find().skip(skip).limit(size).populate('centrecommercialCentreCommmercial typebatimentTypeBatiment').exec();
    const total = await Batiment.countDocuments();
    res.status(200).json({status: 200, message: 'Batiment retrieved successfully', data: {content: data, totalElements: total, totalPages: Math.ceil(total/size), pageNumber: page, pageSize: size}});
  } catch (err) {
    res.status(500).json({status:500, message: err.message});
  }
});

router.get('/:id', async (req, res) => {
  try{
    const b = await Batiment.findById(req.params.id).populate('centrecommercialCentreCommmercial typebatimentTypeBatiment').exec();
    if(!b) return res.status(404).json({status:404, message: 'Batiment not found'});
    res.status(200).json({status:200, message: 'Batiment retrieved successfully', data: b});
  }catch(err){
    res.status(500).json({status:500, message: err.message});
  }
});

router.post('/search', async (req, res) => {
  try {
    const {page, size} = parsePagination(req);
    const skip = page * size;
    const filter = req.body || {};
    const data = await Batiment.find(filter).skip(skip).limit(size).populate('centrecommercialCentreCommmercial typebatimentTypeBatiment').exec();
    const total = await Batiment.countDocuments(filter);
    res.status(201).json({status:200, message: 'Batiments retrieved successfully', data: {content: data, totalElements: total, totalPages: Math.ceil(total/size), pageNumber: page, pageSize: size}});
  } catch (err) {
    res.status(500).json({status:500, message: err.message});
  }
});

router.post('/', async (req, res) => {
  try{
    const b = new Batiment(req.body);
    const saved = await b.save();
    res.status(201).json({status:201, message: 'Batiment saved successfully', data: saved});
  }catch(err){
    res.status(500).json({status:500, message: err.message});
  }
});

router.put('/:id', async (req, res) => {
  try{
    const updated = await Batiment.findByIdAndUpdate(req.params.id, req.body, {new:true}).exec();
    if(!updated) return res.status(404).json({status:404, message: 'Batiment not found'});
    res.status(200).json({status:200, message: 'Batiment updated successfully', data: updated});
  }catch(err){
    res.status(500).json({status:500, message: err.message});
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const d = await Batiment.findByIdAndDelete(req.params.id).exec();
    if(!d) return res.status(404).json({status:404, message: 'Batiment not found'});
    res.status(200).json({status:200, message: 'Batiment deleted successfully', data: null});
  }catch(err){
    res.status(500).json({status:500, message: err.message});
  }
});

module.exports = router;
