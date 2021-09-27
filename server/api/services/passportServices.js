const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const UserServices = require('./UserServices')
const { ErrorAuthorization }  = require('../../errors')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy

async function generateHashPassword(password){

    const cost = 12
    return bcrypt.hash(password, cost)
}

async function checkPassword(password, hashedPassword){

    const validPassword = await bcrypt.compare(password, hashedPassword)
    if(!validPassword) throw new ErrorAuthorization('Password')
    return validPassword
}

passport.use(

    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, async (email, password, done) => {
        try{
            const userService = new UserServices()
            const user = await userService.getByEmail(email)

            if(user){
            
                await checkPassword(password, user.password)
                done(null, user)
    
            }else{
                throw new ErrorAuthorization('Email')
            }
        }
        catch(error){
            done(error)
        }
        
        
    })
)

passport.use(

    new BearerStrategy(async (token, done) => {
        try{
            const payload = jwt.verify(token, process.env.AUTHORIZATION_SECRET)
            const userService = new UserServices()
            const user = await userService.getById(payload.id)
            done(null, user)
        
        }catch(error) { done(error) }
    })
)

module.exports = {
    generateHashPassword: generateHashPassword
}