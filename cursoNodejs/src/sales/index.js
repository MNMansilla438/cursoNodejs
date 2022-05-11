const express = require('express');

const { SalesController } = require('./controller');

const router = express.Router();

module.exports.SalesAPI = (app) => {
    router
    .get('/', SalesController.getUsers)
    .get('/:name', SalesController.getUser)
    .put('/', SalesController.updateUser)
    .post('/compras', SalesController.buying)
    .delete('/', SalesController.deleteUser)
    // update
    
    // delete


    app.use('/api/sales', router);
};