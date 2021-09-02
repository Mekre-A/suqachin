const express = require('express')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const validate = require('../middleware/validation');
const {
    body,
    validationResult
} = require('express-validator')

const {
    sendWelcomeEmail
} = require('../utils/email')


const User = require('../models/users')
const Message = require('../models/message')
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



router.post('/admin/approve/:id', adminAuth, validate('approve'), async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }


    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return req.status(400).send({
                errors: [{
                    'msg': 'Operation failed'
                }]
            })
        }

        const status = req.body.status === 'true'



        const product = await Product.findByIdAndUpdate({
            _id: req.params.id
        }, {
            approvedByAdmin: status,
            rejectedByAdmin: !status
        })

        if (!product) {
            return req.status(400).send({
                errors: [{
                    'msg': 'Approving failed'
                }]
            })
        }

        if (!status) {
            if(!req.body.message){
                return res.status(400).send({
                    errors: [{
                        'msg': 'Please fill in the required fields, title and/or messageBody is missing'
                    }]
                })
            }
            if (req.body.message.title && req.body.message.messageBody) {
                if (validator.isEmpty(req.body.message.title.trim()) || validator.isEmpty(req.body.message.messageBody.trim())) {

                    return res.status(400).send({
                        errors: [{
                            'msg': 'Please fill in the required fields, title and/or messageBody is missing'
                        }]
                    })
                } else {
                    const message = new Message({
                        sender: req.user._id,
                        receiver: product.owner,
                        productId: req.params.id,
                        title: req.body.message.title,
                        messageBody: req.body.message.messageBody,
                    })
                    await message.save()
                }
            } else {
                return res.status(400).send({
                    errors: [{
                        'msg': 'Please fill in the required fields, title and/or messageBody is missing'
                    }]
                })
            }
        }

        res.status(200).send()
    } catch (e) {
        console.log(e)
        res.status(500).send({
            error: e
        })
    }

})

router.delete('/admin/product/:id', adminAuth, async (req, res) => {

    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return req.status(400).send({
                errors: [{
                    'msg': 'Operation failed'
                }]
            })
        }

        const product = await Product.findOneAndDelete({
            _id: req.params.id
        })
        if (!product) {
            res.status(400).send({
                error: [{
                    'msg': 'Deletion failed'
                }]
            })
        }

        res.status(200).send(product)

    } catch (e) {
        return res.status(500).send({
            error: [{
                msg: 'Server Issue'
            }]
        })
    }
})

module.exports = router