const createError = require('http-errors');
const debug = require('debug')('app:module-products-controller');
const { ProductsServices } = require('./services');
const { Response } = require('../common/response');

module.exports.ProductsController = {
    getProducts: async (req, res) => {
        try {
            let products = await ProductsServices.getAll();
            Response.success(res, 200, "Lista de productos", products);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getProduct: async (req, res) => {
        try {
            const { params: { id } } = req;
            let product = await ProductsServices.getById(id);
            if (!product) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Producto ${id}`, product);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createProduct: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            } else {
                const insertedId = await ProductsServices.create(body);
                Response.success(res, 201, `Producto agregado con el id:`, insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    //update
    updateProduct: async (req, res) => {
        try {
            const { body: {
                id,
                name,
                precio,
                cantidad
            }} = req;
            const update = await ProductsServices.update(id, name, precio, cantidad);   
            if (update.modifiedCount === 1) {
                Response.success(res, 202, `Producto actualizado`, {id, name, precio, cantidad});
            } else {
                Response.error(res, new createError.BadRequest());
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
     //delete
    deleteProduct: async (req, res) => {
        try {
            const {body: {name}} = req;
            const deleteElement = await ProductsServices.deleteProduct(name);
            if (deleteElement.deletedCount === 1) {
                Response.success(res, 201, 'Producto Eliminado', name);
            } else {
                Response.error(res, new createError.BadRequest());
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    generateReport: (req, res) => {
        try {
            ProductsServices.generateReport("Inventario", res);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
};