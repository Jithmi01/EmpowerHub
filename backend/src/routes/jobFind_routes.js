const express = require("express");
const router = express.Router();

const {
  getJobFinds,
  getJobFindlById,
  jobApply,
  updateJobApplication,
  deleteJobApplication,
  getApplicationsByJob,
} = require("../controllers/jobFind_controller");

router.get("/", getJobFinds);
router.get("/applications/:id", getApplicationsByJob);
router.get("/:id", getJobFindlById);
router.post("/add", jobApply);
router.put("/update/:id", updateJobApplication);
router.delete("/delete/:id", deleteJobApplication);

module.exports = router;
