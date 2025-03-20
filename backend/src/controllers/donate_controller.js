const Donation = require('../models/donate_model')
const User = require('../models/user_model')

const mongoose = require('mongoose')

// get all Donation
const getDonations = async (req, res) => {
  const donation = await Donation.find({}).sort({ createdAt: -1 })

  res.status(200).json(donation)
}

// get a single Donation
const getDonationById = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Donation' })
  }

  const donation = await Donation.findById(id)

  if (!donation) {
    return res.status(404).json({ error: 'No such Donation' })
  }

  res.status(200).json(donation)
}

const makeDonation = async (req, res) => {
  try {
    
    // Create the new donation
    const newDonation = new Donation({
      name: req.body.name,
      contact: req.body.contact,
      email: req.body.email,
      amount: req.body.amount,
      total: req.body.total,
      status: req.body.status,
      helpGiven: req.body.helpGiven,
    });

    // Save the donation
    const savedDonation = await newDonation.save();

    res.status(200).json(savedDonation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};




// // create a new Donation
// const makeDonation = async (req, res) => {
//   const {name,email,contact,amount,total,status,helpGiven} = req.body

// //   let emptyFields = []

// //   if (!title) {
// //     emptyFields.push('title')
// //   }
// //   if (!load) {
// //     emptyFields.push('load')
// //   }
// //   if (!reps) {
// //     emptyFields.push('reps')
// //   }
// //   if (emptyFields.length > 0) {
// //     return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
// //   }

//   // add to the database
//   try {
//     const donation = await Donation.create({ name,email,contact,amount,total,status,helpGiven })
//     res.status(200).json(donation)
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// }

// delete a Donation
const deleteDonation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Unable to delete' })
  }

  const donation = await Donation.findOneAndDelete({ _id: id })

  if (!donation) {
    return res.status(400).json({ error: 'Unable to delete' })
  }

  res.status(200).json(donation)
}

// update a Financial
const updateDonation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Unable Transaction' })
  }

  const donation = await Donation.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!donation) {
    return res.status(400).json({ error: 'Unable Transaction' })
  }

  res.status(200).json(donation)
}

module.exports = {
  getDonations,
  getDonationById,
  makeDonation,
  deleteDonation,
  updateDonation
}