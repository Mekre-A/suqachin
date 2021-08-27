const jwt = require('jsonwebtoken')
const User = require('../models/users')

const sellerAuth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.role !== 'Seller') {
            return res.status(400).send({
                error: [{
                    'msg': "Please re-authenticate and try again"
                }]
            })
        }
        const user = await User.findOne({
            _id: decoded._id
        });
        if (!user) {
            return res.status(400).send({
                error: [{
                    'msg': "Please re-authenticate and try again"
                }]
            })
        }
        req.user = user;
        next()

    } catch (e) {
        console.log(e)
        return res.status(500).send({
            error: [{
                'msg': "Server Issue"
            }]
        })
    }


}


const customerAuth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.role !== 'Customer') {
            return res.status(400).send({
                error: [{
                    'msg': "Please re-authenticate and try again"
                }]
            })
        }
        const user = await User.findOne({
            _id: decoded._id
        });
        if (!user) {
            return res.status(400).send({
                error: [{
                    'msg': "Please re-authenticate and try again"
                }]
            })
        }
        req.user = user;
        next()

    } catch (e) {
        return res.status(500).send({
            error: [{
                'msg': "Server Issue"
            }]
        })
    }


}


const adminAuth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.role !== 'Admin') {
            return res.status(400).send({
                error: [{
                    'msg': "Please re-authenticate and try again"
                }]
            })
        }
        const user = await User.findOne({
            _id: decoded._id
        });
        if (!user) {
            return res.status(400).send({
                error: [{
                    'msg': "Please re-authenticate and try again"
                }]
            })
        }
        req.user = user;
        next()

    } catch (e) {
        console.log(e)
        return res.status(500).send({
            error: [{
                'msg': "Server Issue"
            }]
        })
    }
}

module.exports = {
    sellerAuth,
    customerAuth,
    adminAuth
}