class ErrorNotFound extends Error {
    constructor(name){
        super()
        this.status = 404;
        this.message = `'${name}' not found`
        
    }
}

module.exports = ErrorNotFound