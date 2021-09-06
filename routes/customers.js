const express = require('express')
const router = express.Router();
const queryString = require('query-string')
const axios  = require('axios')

const {
    customerAuth
} = require('../middleware/authentication');
const customersController = require('../controllers/customers')
const validate = require('../middleware/validation');


router.get('', async(req,res)=>{

    const stringifiedParams = queryString.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: 'http://localhost:7777/authenticate/google',
        scope: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' '), // space seperated string
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent',
      });
      
      const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

      console.log(googleLoginUrl)
    
    res.render('index', {
        googleSignIn:`${googleLoginUrl}`
    })
})

router.post('/signup', validate('signup'), customersController.signUp);

router.post('/verifyAccount/:token', customersController.verifyAccount)

router.post('/login', validate('login'), customersController.login)

router.get('/products', customerAuth, customersController.viewProducts)


router.post('/buy/:id', customerAuth, customersController.buyProducts)


router.post('/wishlist/:id', customerAuth, customersController.addWishlist)


router.delete('/wishlist/:id', customerAuth, customersController.deleteWishlist)

router.get('/authenticate/google', async(req,res)=>{
    const code = req.query.code;

    let { data } = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: 'post',
        data: {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_SECRET_ID,
          redirect_uri: 'http://localhost:7777/authenticate/google',
          grant_type: 'authorization_code',
          code,
        },
      });

      console.log(await axios({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      })) 


    res.send()
})

module.exports = router;