const fileFunc = require('../../infrastructure/functions/fileFunc')
const repository = require('../../infrastructure/repositories/files')

class File {

    getList(){
        
        return repository.getList()
        .then((result) => {
            return result
        })
    }

    getListByUserId(userId){

        return repository.getListByUserId(userId)
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

    getByUserAndFileIds(id, userId){

        return repository.getByUserAndFileIds(id, userId)
        .then((result) => {
            return result[0]
        })
    }
    
    add(file){
        //tratar o multer aqui
        
        file.buffer = (file.buffer ? file.buffer : "d.png")
        
        const timestamp = new Date().getTime().toString()
        file.filename = [`${timestamp.slice(timestamp.length - 5, timestamp.length)}`, 'png'].join('.')
        
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

    update(id, file) {

        return repository.update(id, file)
        .then((result) => {
            return file
        })
    }

    delete(id) {

        return repository.delete(id)
        .then((result) => {
            return file
        })
    }

}

module.exports = new File()