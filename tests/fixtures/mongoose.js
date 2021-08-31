const Product = require('../../models/product')
const Wishlist = require('../../models/wishlist')
const Messages = require('../../models/message')


const setUpDatabase = async()=>{
    await Product.deleteMany();
    await Wishlist.deleteMany();
    await Messages.deleteMany();
}



module.exports = {
    setUpDatabase
}


