const express = require('express');
const router = express.Router();

const {getDonations,getDonationById,makeDonation,deleteDonation,updateDonation} = require('../controllers/donate_controller');

router.get('/', getDonations);
router.get('/:id', getDonationById);
router.post('/', makeDonation);
router.put('/:id', updateDonation);
router.delete('/:id', deleteDonation);

module.exports = router;
