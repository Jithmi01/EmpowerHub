const express =require('express')
const router =express.Router();

const{
    getUsers,
    getUserID,
    createUser,
    updateUser,
    deleteUser
}=require('../controllers/register_controller');

router.get('/',getUsers);
router.get('/',getUserID);
router.post('/',createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports=router;