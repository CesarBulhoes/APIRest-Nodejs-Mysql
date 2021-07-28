class ErrorIncorrectInput extends Error {
    constructor(errors){
        super()
        this.status = 400;
        this.errors = errors
    }
}

module.exports = ErrorIncorrectInput