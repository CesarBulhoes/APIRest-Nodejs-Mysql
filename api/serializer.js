const jsontoxml = require('jsontoxml')

class Serializer {

    json(data, count = null) {
        
        let result = {}

        if(count) {
            result.count = count
            result[this.tagPlural] = data     
        }else{
            result[this.tagSingle] = data  
        }
        
        return JSON.stringify(result)
    }

    xml(data, count = null) {
        
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
        }
        
        if(count) xml = {count, ...xml}

        return jsontoxml(xml)
    }

    serialize(data) { 

        let count = (data.count ? data.count : null)
        data = (data.rows ? data.rows : data)

        if(Array.isArray(data) && data.length > 1) data = data.map(el => this.filter(el))
        else if(Array.isArray(data))  data = this.filter(data[0])
        else data = this.filter(data)
        
        if(this.contentType === 'application/json') {
            
            return this.json(data, count)
        }

        if(this.contentType === 'application/xml') {

            return this.xml(data, count)
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

class FileSerializer extends Serializer{

    constructor(contentType, extraColumns = []){
        super()
        this.publicColumns = ['id', 'userId', 'duration', 'path'].concat(extraColumns)
        this.contentType = contentType
        this.tagSingle = 'file'
        this.tagPlural = 'files'
    }
}

class ErrorSerializer extends Serializer{
    constructor(contentType, extraColumns = []){
        super()
        this.publicColumns = ['status', 'errors', 'error', 'msg', 'param', 'location', 'message', 'path', 'value', 'validatorKey'].concat(extraColumns)
        this.contentType = contentType
        this.tagSingle = 'error'
        this.tagPlural = 'errors'
    }
}

class ErrorSequelizeValidation extends Serializer{
    constructor(contentType, extraColumns = []){
        super()
        this.publicColumns = ['message', 'path', 'value', 'validatorKey'].concat(extraColumns)
        this.contentType = contentType
        this.tagSingle = 'error'
        this.tagPlural = 'errors'
    }
}

module.exports = {
    Serializer: Serializer,
    UserSerializer: UserSerializer,
    ErrorSerializer: ErrorSerializer,
    ErrorSequelizeValidation: ErrorSequelizeValidation,
    FileSerializer: FileSerializer,
    acceptedTypes: ['application/json', 'application/xml', '*/*']
}

