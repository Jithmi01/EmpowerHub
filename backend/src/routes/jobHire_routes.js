const express = require('express');
const router = express.Router();

const { getJobHires, getJobHirelById, createJobHire, updateJobHire, deleteJobHire } = require('../controllers/jobHire_controller');

router.get('/', getJobHires);
router.get('/:id', getJobHirelById);
router.post('/add', createJobHire);
router.put('/update/:id', updateJobHire);
router.delete('/delete/:id', deleteJobHire);

module.exports = router;