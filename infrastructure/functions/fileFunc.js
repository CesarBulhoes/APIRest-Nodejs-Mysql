const fs = require('fs')
const path = require('path');


///Users/cesar/OneDrive/Documentos/NodeJS-Tutorial/functions/images
class fileFunc {

    uploadFile(buffer, filename){
        
        return new Promise((response, reject) => {
            buffer = path.join(__dirname, `../../assets/${buffer}`)
            const filepath = path.join(__dirname, `../../assets/${filename}`)
    
            fs.createReadStream(buffer)
            .pipe(fs.createWriteStream(filepath))
            .on('finish', () => response(filepath))
        })
    }
}

module.exports = new fileFunc()