const express = require('express');

const { UsersController } = require('./controller');

const router = express.Router();

module.exports.UsersAPI = (app) => {
    router
    .get('/', UsersController.getUsers)
    .get('/:id', UsersController.getUser)
    .put('/', UsersController.updateUser)
    .post('/', UsersController.createUser)
    .delete('/', UsersController.deleteUser)
    // update
    
    // delete


    app.use('/api/users', router);
};