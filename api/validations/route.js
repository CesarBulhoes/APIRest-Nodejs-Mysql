const { validationResult } = require('express-validator') 
const ErrorIncorrectInput = require('../../errors/errorIncorrectInput')

class routeCtrl {

    checkErrors(req, res, next) {
        const errors = validationResult(req) 
        if (!errors.isEmpty()) {

            throw new ErrorIncorrectInput(errors.array())
            
        } else {
            return next() 
        }
    }
}


module.exports = new routeCtrl()

