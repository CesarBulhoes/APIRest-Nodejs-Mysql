const {body, param, cookie, header, query, checkSchema, validationResult } = require('express-validator') 
const ErrorIncorrectInput = require('../../errors/errorIncorrectInput')

function checkErrors(req, res, next) {
    const errors = validationResult(req) 
    if (!errors.isEmpty()) {

        throw new ErrorIncorrectInput(errors.array())
        
    } else {
        return next() 
    }
}

validateId = [

    param('id').optional({nullable: true}).isDecimal().withMessage("'Id' needs to be a number."),
    param('userId').optional({nullable: true}).isDecimal().withMessage("'Id' needs to be a number.")
]


module.exports = {
    checkErrors: checkErrors,
    validateId: validateId
}

