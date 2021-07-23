const NotAcceptedType = require('../errors/notAcceptedType')
const jsontoxml = require('jsontoxml')

class Serializer {

    json(data) {
        return JSON.stringify(data)
    }

    xml(data) {

        let arr = data
        let tag = this.tagSingle

        if(data.errors){
            arr = data.errors
        }

        if(Array.isArray(arr)) {

            tag = this.tagPlural

            arr = arr.map((item) => {
                return {[this.tagSingle] : item}
            })
        }

        let xml = { [tag] : arr }

        if(data.errors){
            
            xml = {status: data.status, [tag]:arr}
            // arr = {status, ...arr}
        }



        return jsontoxml(xml)
    }

    serialize(data) { 

        if(Array.isArray(data) && data.length > 1) data = data.map(el => this.filter(el))
        else if(Array.isArray(data))  data = this.filter(data[0])
        else data = this.filter(data)
        
        if(this.contentType === 'application/json') {
            
            return this.json(data)
        }

        if(this.contentType === 'application/xml') {

            return this.xml(data)
        }

        return this.filter(data)
    }

    filter(data) {
        
        const newData = {}
        
        this.publicColumns.forEach((column) => {
            if(data.hasOwnProperty(column)) newData[column] = data[column]
        })
        
        return newData
    }
}

class UserSerializer extends Serializer{

    constructor(contentType, extraColumns = []){
        super()
        this.publicColumns = ['id', 'name', 'email', 'minutes'].concat(extraColumns)
        this.contentType = contentType
        this.tagSingle = 'user'
        this.tagPlural = 'users'
    }
}

class ErrorSerializer extends Serializer{
    constructor(contentType, extraColumns = []){
        super()
        this.publicColumns = ['status', 'errors', 'error', 'mensage']
        this.contentType = contentType
        this.tagSingle = 'error'
        this.tagPlural = 'errors'
    }
}

module.exports = {
    Serializer: Serializer,
    UserSerializer: UserSerializer,
    ErrorSerializer: ErrorSerializer,
    acceptedTypes: ['application/json', 'application/xml']
}

