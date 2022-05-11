const createError = require('http-errors');
const debug = require('debug')('app:module-users-controller');
const { UserServices } = require('./services');
const { Response } = require('../common/response');

module.exports.UsersController = {
    getUsers: async (req, res) => {
        try {
            let users = await UserServices.getAll();
            Response.success(res, 200, "Lista de Usuarios:", users);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getUser: async (req, res) => {
        try {
            const { params: { id } } = req;
            let user = await UserServices.getById(id);
            if (!user) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Usuario: ${id}`, user);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createUser: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            } else {
                const insertedId = await UserServices.create(body);
                Response.success(res, 201, 'Usuario agregado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    //update
    updateUser: async (req, res) => {
        try {
            const { body: { id, name, email } } = req;
            const update = await UserServices.update(id, name, email);
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
    //delete
    deleteUser: async (req, res) => {
        try {
            const { body: { id } } = req;
            const deleteElement = await UserServices.deleteUser(id);
            if (Number(deleteElement["deletedCount"]) === 1) {
                Response.success(res, 201, 'Usuario Eliminado', id);
            } else {
                Response.error(res, new createError.BadRequest());
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
};