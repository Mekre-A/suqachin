const mongoose = require('mongoose')
const validator = require('validator')


const productSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        validator(value){
            if(validator.isEmpty(value)){
                throw new Error('Product name must not be empty')
            }
        }
    },

    description:{
        type:String,
        required:true,
        trim:true,
        validator(value){
            if(validator.isEmpty(value)){
                throw new Error('Product name must not be empty')
            }
        }
    },

    // image:{
    //     type:String,
    //     required:true,
    //     trim:true,
    //     validator(value){
    //         if(validator.isEmpty(value)){
    //             throw new Error('Product name must not be empty')
    //         }
    //     }
    // },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }

})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;