const userModel = require('../models/userModel');

class userCtrl {

    getList = (req, res, next) => {
        userModel.getList(res);
    };
    
    getById = (req, res, next) => {
        userModel.getById(req.params.id, res);
    };
    
    addUser = (req, res, next) => {
        const user = req.body
        userModel.addUser(user, res);
    };
    
    updateUser = (req, res, next) => {
        const user = req.body
        userModel.updateUser(user, res);
    };
    
    deleteUser = (req, res, next) => {
        const user = req.body
        userModel.deleteUser(user, res);
    };
}

module.exports = new userCtrl()