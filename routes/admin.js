const express = require('express')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const validate = require('../middleware/validation');
const {
    validationResult
} = require('express-validator')


const User = require('../models/users')

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

module.exports = router