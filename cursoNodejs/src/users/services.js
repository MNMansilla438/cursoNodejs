const { ObjectId } = require('mongodb');
const { Database } = require('../database');

const COLLECTION = 'users';

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

const update = async (id, name, email) => {
    const filter = {id: id};
    const options = {upsert: true};
    const updateDoc = {
        $set:{
            name: name,
            email: email,
        }
    }
    const collection = await Database(COLLECTION);
    const result = await collection.updateOne({_id: ObjectId(filter)}, updateDoc);
    return result;
}
//update

//delete
const deleteUser = async (id) => {
    const collection = await Database(COLLECTION);
    const deleteElement = await collection.deleteOne({_id: ObjectId(id)});
    return deleteElement;
}

module.exports.UserServices = {
    getAll,
    getById,
    create,
    update,
    deleteUser,
}