const express = require('express')
const router = express.Router();
const sellerController = require('../controllers/seller')
const validate = require('../middleware/validation');
const {sellerAuth} = require('../middleware/authentication')


router.post('/seller/signup', validate('signup'), sellerController.signUp);

router.post('/seller/product', sellerAuth, validate('newProduct'), sellerController.addProduct)

router.delete('/seller/product/:id', sellerAuth, sellerController.deleteProduct)

router.patch('/seller/product/:id', sellerAuth, sellerController.updateProduct)

router.get('/seller/messages', sellerAuth, sellerController.getMessages)


router.get('/seller/products', sellerAuth, sellerController.getOwnProducts)

module.exports = router