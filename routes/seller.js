const express = require('express')
const mongoose = require('mongoose')
const validate = require('../middleware/validation');
const {
    validationResult
} = require('express-validator')


const User = require('../models/users')
const Product = require('../models/product')
const {sellerAuth} = require('../middleware/authentication')

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

        const token = await user.generateAuthToken()

        res.status(201).send({
            user,
            token
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
        const product = new Product({
            name:req.body.name,
            description:req.body.description,
            owner:mongoose.Types.ObjectId(req.user._id)
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
        const updateObject = {};
        if(!req.body.name && !req.body.description){
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

module.exports = router