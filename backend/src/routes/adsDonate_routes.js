const express = require('express');
const router = express.Router();

const {getAllAds,getAdById,addAdvertistment,deleteAd,updateAd} = require('../controllers/adsDonate_controller');

router.get('/', getAllAds);
router.get('/:id', getAdById);
router.post('/create', addAdvertistment);
router.put('/:id', updateAd);
router.delete('/:id', deleteAd);

module.exports = router;
