const mongoose = require('mongoose')
const JobHire = require('../models/jobHire_model')

// get all Hiring details
const getJobHires = async (req, res) => {
  const jobHire = await JobHire.find({}).sort({ createdAt: -1 })

  res.status(200).json(jobHire)
}

// get a single Hiring detail
const getJobHirelById = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Job Vacancy' })
  }

  const jobHire = await JobHire.findById(id)

  if (!jobHire) {
    return res.status(404).json({ error: 'No such Job Vacancy' })
  }

  res.status(200).json(jobHire)
}

// create a new Job Vacancy
const createJobHire = async (req, res) => {
  const { jobTitle, company, location, openingDate, closingDate } = req.body
  try {
    const jobHire = await JobHire.create({ jobTitle, company, location, openingDate, closingDate })
    res.status(200).json(jobHire)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a Job Vacancy
const deleteJobHire = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such Job Vacancy' })
  }

  const jobHire = await JobHire.findOneAndDelete({ _id: id })

  if (!jobHire) {
    return res.status(400).json({ error: 'No such Job Vacancy' })
  }

  res.status(200).json(jobHire)
}

// update a Job Vacancy
const updateJobHire = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such Job Vacancy' })
  }

  const jobHire = await JobHire.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!jobHire) {
    return res.status(400).json({ error: 'No such Job Vacancy' })
  }

  res.status(200).json(jobHire)
}

module.exports = {
  getJobHires,
  getJobHirelById,
  createJobHire,
  deleteJobHire,
  updateJobHire
}