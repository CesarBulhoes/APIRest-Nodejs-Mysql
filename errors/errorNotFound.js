class ErrorNotFound extends Error {
    constructor(name){
        super()
        this.status = 404;
        this.mensage = `'${name}' não encontrado`
        
    }
}

module.exports = ErrorNotFound