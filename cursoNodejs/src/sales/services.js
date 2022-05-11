const { ObjectId } = require('mongodb');
const { Database } = require('../database');

const COLLECTION = 'ventas';
const COLLECTIONPRODUCTS = "products";
const COLLECTIONUSERS = "users";

const getAll = async () => {
    const collection = await Database(COLLECTION);

    const getSales = await collection.aggregate([
        {
            $lookup:
            {
                from: 'users',
                localField: 'id_user',
                foreignField: '_id',
                as: 'ventas'
            }
        }
    ]).toArray();

    return getSales;
}


const getById = async (id) => {
    const collection = await Database(COLLECTIONUSERS);
    const getSale = await collection.findOne(id);

    const getSales = await collection.aggregate([
        {
            '$lookup': {
                'from': 'ventas',
                'localField': '_id',
                'foreignField': 'id_user',
                'as': 'compras'
            }
        }, {
            '$match': {
                '_id': getSale["_id"]
            }
        }
    ]).toArray();

    return getSales;
}

const buying = async (product, user, cantidad) => {
    const getCollection = await Database(COLLECTION);
    const productToBuy = await Database(COLLECTIONPRODUCTS);
    const userBuy = await Database(COLLECTIONUSERS);

    const getProductToBuy = await productToBuy.findOne({ "name": product });
    const resUserBuy = await userBuy.findOne({ "name": user });
    const getTotal = getProductToBuy["precio"] * cantidad;

    const ticketOrder = {
        "gastado": getTotal,
        "cantidad": cantidad,
        "id_product": getProductToBuy["_id"],
        "id_user": resUserBuy["_id"]
    }

    await getCollection.insertOne(ticketOrder);
    return ticketOrder;
}

const update = async (id, name, email) => {
    const filter = { id: id };
    const updateDoc = {
        $set: {
            name: name,
            email: email,
        }
    }
    const collection = await Database(COLLECTION);
    const result = await collection.updateOne({ _id: ObjectId(filter) }, updateDoc);
    return result;
}

const deleteUser = async (id) => {
    const collection = await Database(COLLECTION);
    const query = { id: id }
    const deleteElement = await collection.deleteOne(query);
    return deleteElement;
}

module.exports.SalesServices = {
    getAll,
    getById,
    buying,
    update,
    deleteUser,
}