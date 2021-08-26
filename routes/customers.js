const express = require('express')
const {body, validationResult} = require('express-validator')

const router = express.Router();
const User = require('../models/users')


router.post('/signup', async(req,res)=>{
    try{
        const username = await User.findOne({username:req.body.username})
        const emailAddress = await User.findOne({email:req.body.email})

        if(username || emailAddress){
            throw new Error('Email or username has to be unique')
        }

        req.body.role = 'Customer'

        const user = new User(req.body)

        await user.save();

        const token = await user.generateAuthToken()

        res.status(201).send({user,token})

    
    } catch(e){
        console.log(e)
        res.status(500).send({error:'Come check it out'})
    }
    
})

module.exports = router;