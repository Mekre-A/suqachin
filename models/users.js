const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Please enter a valid email')
            }
        }
    },
    role: {
        type: String,
        required: true,
        default: 'Customer',
        enum: ['Customer', 'Seller', 'Admin']
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value, {
                    minNumbers: 0,
                    minSymbols: 0,
                })) {
                    throw new Error('Please enter a stronger password')
            }
        }
    }
}, {
    timestamps:true
});

userSchema.methods.generateAuthToken = async function(){

    const user = this;

    const token = jwt.sign({_id:user._id.toString(), role:user.role}, process.env.JWT_SECRET)
    return token
}

userSchema.pre('save', async function (next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User;