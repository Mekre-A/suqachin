const express = require('express')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const {
    sendWelcomeEmail
} = require('../utils/email')

const validate = require('../middleware/validation');
const {
    validationResult
} = require('express-validator')

const router = express.Router();
const User = require('../models/users');
const {
    customerAuth
} = require('../middleware/authentication');
const Product = require('../models/product');
const Wishlist = require('../models/wishlist')



router.post('/signup', validate('signup'), async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }


        const username = await User.findOne({
            username: req.body.username
        })
        const emailAddress = await User.findOne({
            email: req.body.email
        })

        if (username || emailAddress) {
            return res.status(400).send({
                error: [{
                    msg: 'Email and username have to be unique'
                }]
            })
        }

        req.body.role = 'Customer'

        const user = new User(req.body)

        await user.save();

        const token = await user.generateVerificationToken()

        sendWelcomeEmail(user.email, user.username, `http://localhost:3333/verifyAccount/${token}`)

        res.status(201).send({
            user
        })


    } catch (e) {
        console.log(e)
        res.status(500).send({
            error: e
        })
    }

});

router.post('/verifyAccount/:token', async (req, res) => {



    if (!(await validator.isJWT(req.params.token))) {
        return res.status(400).send()
    }


    try {
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET)

        const user = await User.findById(decoded._id)

        if (!user) {
            res.status(400).send()
        }

        user.verified = true;

        await user.save();

        const token = await user.generateAuthToken();

        res.status(200).send({
            user,
            token
        })


    } catch (e) {
        console.log(e)
        res.status(500).send({
            error: e
        })
    }




})

router.post('/login', validate('login'), async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array().filter((element) => {
                    delete element.value;
                    return true
                })
            });
        }
        let user;

        if (validator.isEmail(req.body.username)) {
            user = await User.findOne({
                email: req.body.username
            })
        } else {
            user = await User.findOne({
                username: req.body.username.toLowerCase()
            })
        }

        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)) {
                const token = await user.generateAuthToken();
                return res.status(200).send({
                    token,
                    user
                })
            }
            return res.status(400).send({
                error: [{
                    msg: 'The credentials you have entered are incorrect'
                }]
            })
        }

        return res.status(400).send({
            error: [{
                msg: 'The credentials you have entered are incorrect'
            }]
        })



    } catch (e) {
        console.log(e)
        res.status(500).send({
            error: e
        })
    }

})

router.get('/products', customerAuth, async (req, res) => {

    try {
        const product = await Product.find({
            approvedByAdmin: true
        })
        res.status(200).send(product)

    } catch (e) {
        console.log(e)
        res.status(500).send({
            error: e
        })
    }

})


router.post('/buy/:id', customerAuth, async (req, res) => {

    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return req.status(400).send({
                errors: [{
                    'msg': 'Operation failed'
                }]
            })
        }

        const product = await Product.findOne({
            approvedByAdmin: true,
            _id: req.params.id
        })

        const token = await stripe.tokens.create({
            card: {
              number: '4242424242424242',
              exp_month: 8,
              exp_year: 2022,
              cvc: '314',
            },
          });

          

        try {
            const customer = await stripe.customers.create({
                name: req.user.name,
                email: req.user.email,
                source: token.id //req.body.stripeToken
            });
            stripe.charges.create({
                amount: product.price * 100,
                currency: 'usd',
                customer: customer.id,
                description: 'Thank you for your purchase.'
            })

        } catch (err) {
           return res.status(400).send(err)
        }

        product.purchase = product.purchase + 1;

        await product.save()


        res.status(200).send(product)

    } catch (e) {
        console.log(e)
        res.status(500).send({
            error: e
        })
    }

})


router.post('/wishlist/:id', customerAuth, async (req, res) => {

    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send({
                errors: [{
                    'msg': 'Operation failed'
                }]
            })
        }

        const product = await Product.findOne({
            approvedByAdmin: true,
            _id: req.params.id
        })

        if (!product) {
            res.status(400).send({
                errors: [{
                    msg: 'Product not found'
                }]
            })
        }

        const userWishes = await Wishlist.findOne({
            owner: req.user._id
        })
        if (!userWishes) {
            const wishlist = new Wishlist({
                owner: req.user._id,
                items: [
                    req.params.id
                ]
            })
            await wishlist.save()

            return res.status(200).send(wishlist)
        } else {
            userWishes.items.push(req.params.id)
            await userWishes.save()
            return res.status(200).send(userWishes)
        }

    } catch (e) {
        console.log(e)
        return res.status(500).send({
            error: e
        })
    }

})


router.delete('/wishlist/:id', customerAuth, async(req,res) =>{

    try{
        if (!mongoose.isValidObjectId(req.params.id)) {
            return req.status(400).send({
                errors: [{
                    'msg': 'Operation failed'
                }]
            })
        }

        const wishListItems = await Wishlist.findOne({
            owner:req.user._id
        })

        if(!wishListItems){
            res.status(400).send({
                error:[
                    {
                        'msg':'Deletion failed'
                    }
                ]
            })
        }

        const updatedItems = wishListItems.items.filter((item)=> item.toString() !== req.params.id)

        wishListItems.items = updatedItems;

        await wishListItems.save()
        
        res.status(200).send(wishListItems)

    } catch(e){
        console.log(e)
        return res.status(500).send({
            error:[
                {
                    msg:'Server Issue'
                }
            ]
        })
    }
})

module.exports = router;