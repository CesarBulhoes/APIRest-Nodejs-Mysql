function loadRoutes(app) {
    
    const path = require('path')
    const { readdirSync } = require('fs')
    const fs = require('fs')
    
    const folderPath = path.join(__dirname, '../../api/routes')
    
    readdirSync(folderPath).forEach(fileName => {
        
        const fullPath = path.join(folderPath, fileName)
            
        if(fs.lstatSync(fullPath).isFile()){
            require(fullPath)(app)
        }
    })
}

function getRequiredType(requiredType, acceptedTypes) {
    
    let splitedRequiredTypes = []
    requiredType = requiredType.split(',')

    for( let index in requiredType ){
        splitedRequiredTypes = splitedRequiredTypes.concat(requiredType[index].split(';'))
    }

    let result = {}

    for( let index in splitedRequiredTypes ){
        if (!result[splitedRequiredTypes[index]]) result[splitedRequiredTypes[index]] = true
    }
    
    for( let index in acceptedTypes ){
        
        if (result[acceptedTypes[index]]) { 

            if(acceptedTypes[index] == '*/*') return 'application/json'
            return acceptedTypes[index]
        }
    }

    return false
}

module.exports = {
    loadRoutes: loadRoutes,
    getRequiredType: getRequiredType
}