const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobHireSchema = new Schema({
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    openingDate: { type: String, required: true },
    closingDate: { type: String, required: true }
},)

module.exports = mongoose.model('JobHire', jobHireSchema)
