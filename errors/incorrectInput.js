class IncorrectInput extends Error {
    constructor(errors){
        super()
        this.status = 400;
        this.errors = errors

        // this.value = error.value
        // this.mensage = error.msg
        // this.param = error.param
        // this.location = error.location
    }
}

module.exports = IncorrectInput