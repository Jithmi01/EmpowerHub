const Advertistment = require('../models/adsDonate_model')
const mongoose = require('mongoose')

// get all ads
const getAllAds = async (req, res) => {
  const ad = await Advertistment.find({}).sort({createdAt: -1})

  res.status(200).json(ad)
}

// get a single ad
const getAdById = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Ad'})
  }

  const ad = await Advertistment.findById(id)

  if (!ad) {
    return res.status(404).json({error: 'No such Ad'})
  }

  res.status(200).json(ad)
}

// create a new Ad
const addAdvertistment = async (req, res) => {
  const {name,smallDes,longDes,location,help} = req.body
  console.log("name",name);


  try {
    const ad = await Advertistment.create({ name,smallDes,longDes,location,help })
    res.status(200).json(ad)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a ad
const deleteAd = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'Unable to delete'})
  }

  const ad = await Advertistment.findOneAndDelete({_id: id})

  if(!ad) {
    return res.status(400).json({error: 'Unable to delete'})
  }

  res.status(200).json(ad)
}

// update an ad
const updateAd = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'Unable Transaction'})
  }

  const ad = await Advertistment.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!ad) {
    return res.status(400).json({error: 'Unable Transaction'})
  }

  res.status(200).json(ad)


  
}

module.exports = {
    getAllAds,
    getAdById,
    addAdvertistment,
    deleteAd,
    updateAd
}