class ErrorNotAcceptedType extends Error {
    constructor(contentType){
        super()
        this.status = 406;
        this.mensage = `O tipo de conteúdo '${contentType}' não suportado` 
       
    }
}

module.exports = ErrorNotAcceptedType