const {body, param, cookie, header, query, checkSchema} = require('express-validator')

class UserValidation {

    getById = [

        param('id').isDecimal().withMessage('UserId precisa conter somente números.')
    ]

    password = [
        // body('name').isLength({ min: 5 }).withMessage('Nome precisa ter pelo menos 5 caracteres.'),
        // body('email').isEmail().withMessage('Email inválido.'),
        body('password').custom(password => { 
            if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/.test(password)) {
             
                return Promise.resolve()
            }
            
            return Promise.reject()
          }).withMessage("'Password' must contain at least 8 and maximum 50 characters including at least 1 uppercase, 1 lowercase, one number and one special character (@, $, !, %, *, ?, &).")
    ]
    
    updateUser = [
        
        // param('id').isDecimal().withMessage('UserId precisa conter somente números.'),
        // body('name').isLength({ min: 5 }).withMessage('Nome precisa ter pelo menos 5 caracteres.'),
        // body('email').isEmail().withMessage('Email inválido ou incorreto.'),
        // body('password').isLength({ min: 6 }).withMessage('Senha precisa ter pelo menos 6 caracteres.'),
    ]

    deleteUser = [
        param('id').isDecimal().withMessage('UserId precisa conter somente números.')
    ]
}

module.exports = new UserValidation()