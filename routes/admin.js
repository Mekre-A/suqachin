const express = require('express')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const validate = require('../middleware/validation');
const {
    validationResult
} = require('express-validator')


const User = require('../models/users')
const {
    adminAuth
} = require('../middleware/authentication')
const Product = require('../models/product')

const router = express.Router();


router.post('/admin/signup', validate('signup'), async (req, res) => {

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

        req.body.role = 'Admin'

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

router.patch('/admin/approve/:id', adminAuth, async (req, res) => {


    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return req.status(400).send({
                errors: [{
                    'msg': 'Operation failed'
                }]
            })
        }

        const product = await Product.findByIdAndUpdate({
            _id: req.params.id
        }, {
            approvedByAdmin: true
        })

        if (!product) {
            return req.status(400).send({
                errors: [{
                    'msg': 'Approving failed'
                }]
            })
        }

        res.status(200).send()
    } catch (e) {
        console.log(e)
        res.status(500).send({
            error: e
        })
    }

})

router.delete('/admin/product/:id', adminAuth, async(req,res) =>{

    try{
        if (!mongoose.isValidObjectId(req.params.id)) {
            return req.status(400).send({
                errors: [{
                    'msg': 'Operation failed'
                }]
            })
        }
        
        const product = await Product.findOneAndDelete({_id:req.params.id})
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

module.exports = router