const express = require('express');
const { signup, login, getUsers, updateUser, deleteUser } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/users/signup', signup);            
router.post('/users/login', login);              
router.get('/users', protect, getUsers);   
router.put('/users/:id', protect, updateUser); 
router.delete('/users/:id', protect, deleteUser); 

module.exports = router;
