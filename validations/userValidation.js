const {body, validationResult} = require('express-validator')

class userValidation {

    getById = [
        // body('id').isDecimal().withMessage('ID precisa conter somente números.')
    ]

    addUser = [
        body('name').isLength({ min: 5 }).withMessage('Nome precisa ter pelo menos 5 caracteres.'),
        body('email').isEmail().withMessage('Email inválido.'),
        body('password').isLength({ min: 6 }).withMessage('Senha precisa ter pelo menos 6 caracteres.'),
    ]

    updateOrDeleteUser = [
        body('id').isInt().withMessage('ID precisa conter somente números.'),
        body('name').isLength({ min: 5 }).withMessage('Nome precisa ter pelo menos 5 caracteres.'),
        body('email').isEmail().withMessage('Email inválido ou incorreto.'),
        body('password').isLength({ min: 6 }).withMessage('Senha precisa ter pelo menos 6 caracteres.'),
    ]

}

module.exports = new userValidation()