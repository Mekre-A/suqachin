const express = require('express')
const router = express.Router();

const {
    customerAuth
} = require('../middleware/authentication');
const customersController = require('../controllers/customers')
const validate = require('../middleware/validation');



router.post('/signup', validate('signup'), customersController.signUp);

router.post('/verifyAccount/:token', customersController.verifyAccount)

router.post('/login', validate('login'), customersController.login)

router.get('/products', customerAuth, customersController.viewProducts)


router.post('/buy/:id', customerAuth, customersController.buyProducts)


router.post('/wishlist/:id', customerAuth, customersController.addWishlist)


router.delete('/wishlist/:id', customerAuth, customersController.deleteWishlist)

module.exports = router;