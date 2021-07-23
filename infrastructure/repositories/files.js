const query = require('../infrastructure/database/queries')

class Files {

    getList(){

        const sql = `SELECT * FROM files`

        return query(sql)
    }

    getById(id){

        const sql = `SELECT * FROM files WHERE id = ?`

        return query(sql, id)
    }

    add(file) {

        const sql = `INSERT INTO files SET ?`

        return query(sql, file)
    }  

    update(file){

        const sql = `UPDATE files SET ? WHERE id = ?`
        const fileId = file.id
       
        return query(sql, file, fileId)
    }

    delete(file){

        const sql = `DELETE FROM files WHERE id = ?`
        const fileId = file.id
        
        return query(sql, fileId)
    }
}

module.exports = new Files()