const express = require('express')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const validate = require('../middleware/validation');
const {
    validationResult
} = require('express-validator')

const router = express.Router();
const User = require('../models/users')


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

router.post('/login', validate('login'), async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array().filter((element)=>{
                    delete element.value;
                    return true
                })
            });
        }
        let user;
        
        if (validator.isEmail(req.body.username)) {
            user = await User.findOne({email: req.body.username})
        } else {
            user = await User.findOne({username: req.body.username.toLowerCase()})
        }
        
        if (user) {
            if(await bcrypt.compare(req.body.password, user.password)){
                const token = await user.generateAuthToken();
                return res.status(200).send({
                    token
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

module.exports = router;