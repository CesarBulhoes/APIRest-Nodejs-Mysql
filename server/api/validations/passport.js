const passport = require('passport')
const { ErrorAuthorization } = require('./../../errors')

module.exports = {
    local: (req, res, next) => {
        passport.authenticate(
            'local',
            { session: false},
            (error, user, info) => {

                if(error) return next(error)

                if(!user) return next(new ErrorAuthorization('Credentials'))
                
                req.user = user
                
                return next()    
            }
        )(req, res, next)
    },
    bearer: (req, res, next) => {
        passport.authenticate(
            'bearer',
            { session: false},
            (error, user, info) => {

                if(error && error.name == 'TokenExpiredError') return next(new ErrorAuthorization('Expired', error.expiredAt))

                if(error) return next(error)

                if(!user) return next(new ErrorAuthorization('Credentials'))
                
                req.passport = { user: user }
                
                return next()    
            }
        )(req, res, next)
    }
}