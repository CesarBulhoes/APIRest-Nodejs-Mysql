const { validationResult } = require('express-validator') 
const IncorrectInput = require('../../errors/incorrectInput')

class routeCtrl {

    checkErrors(req, res, next) {
        const errors = validationResult(req) 
        if (!errors.isEmpty()) {

            throw new IncorrectInput(errors.array())
            
        } else {
            return next() 
        }
    }
}


module.exports = new routeCtrl()

