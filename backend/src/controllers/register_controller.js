
const mongoose = require('mongoose')
const Users=require('../models/register_model')


// get all user
const getUsers = async (req, res) => {
    const user = await Users.find({}).sort({createdAt: -1})
  
    res.status(200).json(user)
  }
  
  // get a single user
  const getUserID = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such user'})
    }
  
    const user = await Users.findById(id)
  
    if (!user) {
      return res.status(404).json({error: 'No such user'})
    }
  
    res.status(200).json(user)
  }
  
  // create a new Financial
  const createUser = async (req, res) => {
    const {name, designation, sex, address, email, password, cNo} = req.body
  
    let emptyFields = []
  
    if (!name) {
      emptyFields.push('please enter the name')
    }
    if (!designation) {
      emptyFields.push('please enter the designation')
    }
    if (!password) {
      emptyFields.push('please enter the password')
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
  
    // add to the database
    try {
      const user = await Users.create({ name, designation, sex, address, email, password, cNo })
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  
  // delete a user
  const deleteUser = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such user'})
    }
  
    const user = await Users.findOneAndDelete({_id: id})
  
    if(!user) {
      return res.status(400).json({error: 'No such user'})
    }
  
    res.status(200).json(user)
  }
  
  // update a Financial
  const updateUser = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such user'})
    }
  
    const user = await Users.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!user) {
      return res.status(400).json({error: 'No such Financial'})
    }
  
    res.status(200).json(user)
  }


  module.exports={
    getUserID,
    getUsers,
    createUser,
    updateUser,
    deleteUser

  }