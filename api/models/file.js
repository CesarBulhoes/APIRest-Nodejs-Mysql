const moment = require('moment')
const fileFunc = require('../infrastructure/functions/fileFunc')
const repository = require('../repositories/files')

class File {

    getList(){
        
        return repository.getList()
        .then((result) => {
            return result
        })
    }

    getById(id){

        return repository.getById(id)
        .then((result) => {
            return result[0]
        })
    }
    
    add(file){

        const splitedFilename = file.filename.split('.')
        const timestamp = new Date().getTime().toString()
        file.filename = [`${splitedFilename[0]}-${timestamp.slice(timestamp.length - 5, timestamp.length)}`, splitedFilename[1]].join('.')
        
        return fileFunc.uploadFile(file.buffer, file.filename)
        .then(path => {

            file.path = path
            delete file.filename
            delete file.buffer
            
            return  repository.add(file)
            .then((result) => {
                
                let id = result.insertId
                file = {id, ...file}
                
                return file
            })
        })
    }

    update(file) {

        return repository.update(file)
        .then((result) => {
            return file
        })
    }

    delete(file) {

        return repository.delete(file)
        .then((result) => {
            return file
        })
    }

}

module.exports = new File()