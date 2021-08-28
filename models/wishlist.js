const mongoose = require('mongoose')


const wishlistSchema = new mongoose.Schema({

    owner:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    items:[{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'Product'
    }]
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist

