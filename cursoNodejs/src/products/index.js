const express = require('express');

const { ProductsController } = require('./controller');

const router = express.Router();

module.exports.ProductsAPI = (app) => {
    router
    .get('/', ProductsController.getProducts)
    .get("/report", ProductsController.generateReport)
    .get('/:id', ProductsController.getProduct)
    .put('/', ProductsController.updateProduct)
    .post('/', ProductsController.createProduct)
    .delete('/', ProductsController.deleteProduct)
    // update
    
    // delete


    app.use('/api/products', router);
};