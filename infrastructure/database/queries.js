const connection = require('./connection')

const execQuery = (query, params = '', identifier = '') => {
    
    (identifier ? params = [params, identifier] : '')

    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, results, fields) => {
            if (error) reject(error)
            else resolve(results) 
        })
    })
    
   
}

module.exports = execQuery