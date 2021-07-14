const fs = require('fs')
const path = require('path');


///Users/cesar/OneDrive/Documentos/NodeJS-Tutorial/functions/images
class fileFunc {

    uploadFile(original, filename, callback){
        
        original = path.join(__dirname, original)
        const filepath = path.join(__dirname, `./images/${filename}`)

        fs.createReadStream(original)
        .pipe(fs.createWriteStream(filepath))
        .on('finish', () => callback(filepath))
    }
}

module.exports = new fileFunc()