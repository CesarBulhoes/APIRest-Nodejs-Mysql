const moment = require('moment')
const connection = require('../infrastructure/connection')
const fileFunc = require('../functions/fileFunc')

class File {

    getList(res){
        const sql = `SELECT * FROM files WHERE deleted = 0`
        
        connection.query(sql, (error, result) => {
            if (error) return res.status(400).send(error)
            else  return res.status(200).send(result)
        })
    }

    getById(id, res){
        const sql = `SELECT * FROM files WHERE id = ?`
        
        connection.query(sql, [id], (error, result) => {
            if (error) return res.status(400).send(error)
            else  return res.status(200).send(result[0])
        })
    }
    
    addFile(file, res){

        fileFunc.uploadFile(file.filename, (path) => {
            console.log(path)
            file.path = path
            delete file.filename
            
            const sql = `INSERT INTO files SET ?`
            connection.query(sql, file, (error, result) => {
                if (error) res.status(400).send(error)
                else  {
                    let id = result.insertId
                    file = {id, ...file}
                    res.status(201).send(file)
                }
            })
        })
    }

    updateFile(file, res) {

        const updated_at = moment().format('YYYY-MM-DD HH:MM')
        file = {...file, updated_at}

        const sql = `UPDATE files SET ? WHERE id = ?`
        connection.query(sql, [file, file.id], (error, result) => {
            if (error) res.status(400).send(error)
            else  res.status(200).send(file)
        })
    }

    deleteFile(file, res) {
        
        const updated_at = moment().format('YYYY-MM-DD HH:MM')
        const deleted = 1
        file = {...file, updated_at, deleted}

        const sql = `UPDATE files SET ? WHERE id = ?`
        connection.query(sql, [file, file.id], (error, result) => {
            if (error) res.status(400).send(error)
            else  res.status(200).send(file)
        })
    }

}

module.exports = new File()