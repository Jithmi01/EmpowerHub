const Financial = require('../models/financial_model')
const mongoose = require('mongoose')

// get all Financial
const getFinancials = async (req, res) => {
  const financial = await Financial.find();
  console.log("===> "+financial)
  res.status(200).json(financial)
}

// get a single Financial
const getFinancialById = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Financial'})
  }

  const financial = await Financial.findById(id)

  if (!financial) {
    return res.status(404).json({error: 'No such Financial'})
  }

  res.status(200).json(financial)
}

// create a new Financial
const createFinancial = async (req, res) => {

  const {name,type,date,venue,total,status} = req.body
  console.log("name", name);
  console.log("name", type);
  console.log("name", date);
  console.log("name", venue);
  console.log("name", total);
  console.log("name", status);

  // add to the database
  try {
    const financial = await Financial.create({ name,type,date,venue,total,status })
    res.status(200).json(financial)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a Financial
const deleteFinancial = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Financial'})
  }

  const financial = await Financial.findOneAndDelete({_id: id})

  if(!financial) {
    return res.status(400).json({error: 'No such Financial'})
  }

  res.status(200).json(financial)
}

// update a Financial
const updateFinancial = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Financial'})
  }

  const financial = await Financial.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!financial) {
    return res.status(400).json({error: 'No such Financial'})
  }

  res.status(200).json(financial)
}

module.exports = {
  getFinancials,
  getFinancialById,
  createFinancial,
  deleteFinancial,
  updateFinancial
}