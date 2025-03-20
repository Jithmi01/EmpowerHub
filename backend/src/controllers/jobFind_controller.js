const mongoose = require("mongoose");
const JobFind = require("../models/jobFind_model");

// get all Job details
const getJobFinds = async (req, res) => {
  const jobFind = await JobFind.find({}).sort({ createdAt: -1 });

  res.status(200).json(jobFind);
};

// get all Job details
const getApplicationsByJob = async (req, res) => {
  const { id } = req.params;

  const jobFind = await JobFind.find({ jobId: id }).sort({ createdAt: -1 });

  res.status(200).json(jobFind);
};

// get a single Job detail
const getJobFindlById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Job Vacancy" });
  }

  const jobFind = await JobFind.findById(id);

  if (!jobFind) {
    return res.status(404).json({ error: "No such Job Vacancy" });
  }

  res.status(200).json(jobFind);
};

// Apply for a job
const jobApply = async (req, res) => {
  const { firstName, lastName, email, contactNum, pastExp, jobId } = req.body;

  //   let emptyFields = []

  //   if (!title) {
  //     emptyFields.push('title')
  //   }
  //   if (!load) {
  //     emptyFields.push('load')
  //   }
  //   if (!reps) {
  //     emptyFields.push('reps')
  //   }
  //   if (emptyFields.length > 0) {
  //     return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  //   }

  // add to the database
  try {
    const jobFind = await JobFind.create({
      firstName,
      lastName,
      email,
      contactNum,
      pastExp,
      jobId,
    });
    res.status(200).json(jobFind);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete an Application
const deleteJobApplication = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Job Application" });
  }

  const jobFind = await JobFind.findOneAndDelete({ _id: id });

  if (!jobFind) {
    return res.status(400).json({ error: "No such Job Application" });
  }

  res.status(200).json(jobFind);
};

// update a Job application
const updateJobApplication = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Job Application" });
  }

  const jobFind = await JobFind.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!jobFind) {
    return res.status(400).json({ error: "No such Job Application" });
  }

  res.status(200).json(jobFind);
};

module.exports = {
  getJobFinds,
  getJobFindlById,
  jobApply,
  deleteJobApplication,
  updateJobApplication,
  getApplicationsByJob
};
