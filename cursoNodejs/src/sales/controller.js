const createError = require('http-errors');
const debug = require('debug')('app:module-sales-controller');
const { SalesServices } = require('./services');
const { Response } = require('../common/response');

module.exports.SalesController = {
    getUsers: async (req, res) => {
        try {
            let sales = await SalesServices.getAll();
            Response.success(res, 200, "Lista de ventas:", sales);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    getUser: async (req, res) => {
        try {
            const { params: { id } } = req;
            let sales = await SalesServices.getById(id);
            if (!sales) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Usuario: ${id}`, sales);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    buying: async (req, res) => {
        try {
            const { body: {name, user, cantidad} } = req;
            const respos = await SalesServices.buying(name, user, cantidad);
            Response.success(res, 200, `${name}, comprado por ${user}`, respos);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { body: { id, name, email } } = req;
            const update = await SalesServices.update(id, name, email);
            if (update.modifiedCount === 1) {
                Response.success(res, 201, 'Usuario actualizado', { id, name, email });
            } else {
                Response.error(res, new createError.BadRequest());
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { body: { id } } = req;
            const deleteElement = await SalesServices.deleteUser(id);
            if (deleteElement.deletedCount === 1) {
                Response.success(res, 201, 'Usuario Eliminado', body);
            } else {
                Response.error(res, new createError.BadRequest());
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
};