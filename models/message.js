const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

    sender:{
        type:mongoose.Types.ObjectId,
        required:true,
    },

    receiver:{
        type:mongoose.Types.ObjectId,
        required:true
    },

    productId:{
        type:mongoose.Types.ObjectId,
        required:true
    },

    title:{
        type:String,
        required:true
    },

    messageBody:{
        type:String,
        required:true
    },

    seen:{
        type:Boolean,
        required:true,
        default:false
    }


})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message