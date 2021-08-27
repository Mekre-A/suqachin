const {
    body
} = require('express-validator')


validate = (method) => {
    switch (method) {
        case 'signup': {
            return [
                body('username').isLength({
                    min: 1
                }),
                body('email').isEmail(),
                body('password').isStrongPassword({
                    minNumbers: 0,
                    minSymbols: 0,
                }).withMessage('Password must be 8 letters with atleast one uppercase and one lowercase letters')
            ]
        } 
        case 'login': {
            return [
                body('username').not().isEmpty().withMessage('Please enter your credentials correctly'),
            
                body('password').isStrongPassword({
                    minNumbers: 0,
                    minSymbols: 0,
                }).withMessage('Please enter your credentials correctly'),
            ]
        }
        case 'newProduct' : {
            return [
                body('name').not().isEmpty().withMessage('Product name must not be empty'),
            ]
        }
    }
}

module.exports = validate