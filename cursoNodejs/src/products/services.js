const { ObjectId } = require('mongodb');
const { Database } = require('../database');
const { ProductsUtils } = require('./utils');

const COLLECTION = 'products';


const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: ObjectId(id)});
}

const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const update = async (id, nameProduct, precio, cantidad) => {
    const filter = {id: id};
    const options = {upsert: true};
    const updateDoc = {
        $set:{
            "name": nameProduct,
            cantidad: cantidad,
            precio: precio,
        }
    }
    const collection = await Database(COLLECTION);
    const result = await collection.updateOne({ _id: ObjectId(filter)}, updateDoc);
    return result;
}
//update

//delete
const deleteProduct = async (id) => {
    const collection = await Database(COLLECTION);
    const query = {id: id}
    const deleteElement = await collection.deleteOne({_id: ObjectId(query)});
    return deleteElement;
}

const generateReport = async (name, res) =>{
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, res);
}



module.exports.ProductsServices = {
    getAll,
    getById,
    create,
    update,
    deleteProduct,
    generateReport
}