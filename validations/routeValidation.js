const { validationResult } = require('express-validator') 

class routeCtrl {

    checkErrors(req, res, next) {
        const errors = validationResult(req) 
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() }) 
        } else {
            return next() 
        }
    }
}


module.exports = new routeCtrl()

