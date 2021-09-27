const Services = require('./Services')
const database = require('../models')

class FileServices extends Services{
    constructor(){
        super('Files')
    }
}

module.exports = FileServices