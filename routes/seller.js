const express = require('express')
const mongoose = require('mongoose')
const validate = require('../middleware/validation');
const {
    validationResult
} = require('express-validator')

const {
    sendWelcomeEmail
} = require('../utils/email')


const User = require('../models/users')
const Product = require('../models/product')
const {sellerAuth} = require('../middleware/authentication')
const Message = require('../models/message')

const router = express.Router();


router.post('/seller/signup', validate('signup'), async (req, res) => {

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

        req.body.role = 'Seller'

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

router.post('/seller/product', sellerAuth, validate('newProduct'), async(req,res)=>{

    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const product = new Product({
            name:req.body.name,
            description:req.body.description,
            owner:mongoose.Types.ObjectId(req.user._id),
            price:req.body.price
        })

        await product.save();

        res.status(201).send(product)

    } catch (e){

        console.log(e)

        return res.status(500).send({
            error:[{
                msg:'Server Issue'
            }]
        })
    }
})

router.delete('/seller/product/:id', sellerAuth, async(req,res) =>{

    try{
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send({
                errors: [{
                    'msg': 'Operation failed'
                }]
            })
        }

        const product = await Product.findOneAndDelete({_id:req.params.id, owner:req.user._id})
        if(!product){
            res.status(400).send({
                error:[
                    {
                        'msg':'Deletion failed'
                    }
                ]
            })
        }

        res.status(200).send(product)

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

router.patch('/seller/product/:id', sellerAuth, async(req,res) =>{

    try{
        if (!mongoose.isValidObjectId(req.params.id)) {
            return req.status(400).send({
                errors: [{
                    'msg': 'Operation failed'
                }]
            })
        }
        
        const updateObject = {};
        if(!req.body.name && !req.body.description && !req.body.price){
           return res.status(400).send({
                error:[
                    {
                        'msg':'Updating failed'
                    }
                ]
            })
        } else{
            if(req.body.name){
                updateObject.name = req.body.name
            } 
            if(req.body.description){
                updateObject.description = req.body.description
            } 
            if(req.body.price){
                updateObject.price = req.body.price
            }
        }
        const product = await Product.findOneAndUpdate({_id:req.params.id, owner:req.user._id}, updateObject)
        if(!product){
            res.status(400).send({
                error:[
                    {
                        'msg':'Updating failed'
                    }
                ]
            })
        }

        res.status(200).send(product)

    } catch(e){
        return res.status(500).send({
            error:[
                {
                    msg:'Server Issue'
                }
            ]
        })
    }
})

router.get('/seller/messages', sellerAuth, async (req,res) =>{

    try{
    const messages = await Message.find({
        receiver:req.user._id
    })

    res.status(200).send(messages)
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


router.get('/seller/products', sellerAuth, async (req,res) =>{

    try{
    const products = await Product.find({
        owner:req.user._id
    })

    res.status(200).send(products)
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

module.exports = router