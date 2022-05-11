const express = require('express');
const debug = require('debug')('app:main');

const { Config } = require("./src/config");
const { ProductsAPI } = require('./src/products');
const { SalesAPI } = require('./src/sales');
const { UsersAPI } = require('./src/users');
const { IndexAPI, NotFoundAPI } = require('./src/index');

const app = express();

app.use(express.json());


//Modulos
IndexAPI(app);
ProductsAPI(app);
UsersAPI(app);
SalesAPI(app);
NotFoundAPI(app);

app.listen(Config.port, () => {
    debug(`Servidor encendido en el puerto ${Config.port }`);
})