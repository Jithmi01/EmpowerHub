const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobFindSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contactNum: { type: String, required: true },
    pastExp: { type: String, required: true },
    jobId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("JobFind", jobFindSchema);
