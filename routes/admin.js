
const express = require('express')
const adminController = require('../controllers/admin')
const validate = require('../middleware/validation');
const router = express.Router();

const {
    adminAuth
} = require('../middleware/authentication')

router.post('/admin/signup', validate('signup'),adminController.signUp);



router.post('/admin/approve/:id', adminAuth, validate('approve'), adminController.approve)

router.delete('/admin/product/:id', adminAuth, adminController.deleteProduct)

module.exports = router