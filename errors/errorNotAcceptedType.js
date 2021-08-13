class ErrorNotAcceptedType extends Error {
    constructor(contentType){
        super()
        this.status = 406;
        this.message = `Type of content '${contentType}' not suported` 
       
    }
}

module.exports = ErrorNotAcceptedType