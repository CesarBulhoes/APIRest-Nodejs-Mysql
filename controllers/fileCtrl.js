const fileModel = require('../models/fileModel');

class fileCtrl {

    getList = (req, res, next) => {
        fileModel.getList(res);
    };
    
    getById = (req, res, next) => {
        fileModel.getById(req.params.id, res);
    };
    
    addFile = (req, res, next) => {
        const file = req.body
        fileModel.addFile(file, res);
    };
    
    updateFile = (req, res, next) => {
        const file = req.body
        fileModel.updateFile(file, res);
    };
    
    deleteFile = (req, res, next) => {
        const file = req.body
        fileModel.deleteFile(file, res);
    };
}

module.exports = new fileCtrl()