const express = require('express');
const router = express.Router();

const {getFinancials,getFinancialById,createFinancial,updateFinancial,deleteFinancial} = require('../controllers/financial_controller');

router.get('/', getFinancials);
router.get('/:id', getFinancialById);
router.post('/create', createFinancial);
router.put('/:id', updateFinancial);
router.delete('/:id', deleteFinancial);

module.exports = router;
