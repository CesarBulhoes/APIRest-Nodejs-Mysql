const {body, validationResult} = require('express-validator')

class FileValidation {

    checkExtension = [
        // body('filename').custom(filename => {
        //     if(['png', 'jpg', 'jpeg', 'mpeg'].includes(filename.split('.').slice(1).join('.'))){
        //         return true 
        //     }else{
        //         let a = Promise.reject('Arquivo com extensão inválida. Formatos aceitáveis: png, jpg, jpeg, mpeg.')
        //         return a
        //     }
        // })
    ]

}

module.exports = new FileValidation()