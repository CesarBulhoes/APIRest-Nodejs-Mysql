class ErrorAuthorization extends Error {
    constructor(name, expiredAt = ''){
        super()
        this.status = 401;

        if(name == 'Expired'){

            this.message = `Authentication expired`
            this.expiredAt = expiredAt
            
        }else if(name == 'Credentials'){

            this.message = `Credentials not informed properly`

        }else{

            this.message = `Credentials are incorrect or were not found `
        }
    }
}

module.exports = ErrorAuthorization