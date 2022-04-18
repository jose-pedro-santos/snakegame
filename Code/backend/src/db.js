const { MongoClient, ObjectId } = require('mongodb')
const URL = process.env.MONGO_URL ?? "mongodb://127.0.0.1:27017"
const DATABASE_NAME = "snake"
const USER_COLLECTION = "users"
const SESSION_COLLECTION = "sessions"
const SCORE_COLLECTION = "scores"


let client
async function connectToMongo() {
    try {
        if (!client) {
            client = await MongoClient.connect(URL)
        }
        return client;
    } catch (err) {
        console.log(err)
    }
}

async function getMongoCollection(dbName, collectionName) {
    const client = await connectToMongo()
    return client.db(dbName).collection(collectionName)
}

async function insertUser(user) {
    const collection = await getMongoCollection(DATABASE_NAME, USER_COLLECTION)
    const res = await collection.insertOne(user)
    return res.insertedId
}

async function readAllScores() {
    const collection = await getMongoCollection(DATABASE_NAME, SCORE_COLLECTION)
    const result = await collection.find().toArray()
    return result
}

async function insertScore(datascore) {
    const collection = await getMongoCollection(DATABASE_NAME, SCORE_COLLECTION)
    const res = await collection.insertOne(datascore)
    return res.insertedId
}

async function findUserByUsername(username) {
    const collection = await getMongoCollection(DATABASE_NAME, USER_COLLECTION)
    const user = await collection.findOne({ username })
    return user
}

async function insertSession(session) {
    const collection = await getMongoCollection(DATABASE_NAME, SESSION_COLLECTION)
    const res = await collection.insertOne(session)
    return res.insertedId
}

async function findSessionByToken(token) {
    if (!ObjectId.isValid(token)) return undefined
    const collection = await getMongoCollection(DATABASE_NAME, SESSION_COLLECTION)
    const session = await collection.findOne({ _id: new ObjectId(token) })
    return session
}

// async function deleteSession(sku) {
//     const collection = await getMongoCollection(DATABASE_NAME, SESSION_COLLECTION)
//     const result = await collection.deleteOne({ _id: new ObjectId(token) })
//     return result.deletedCount
// }

module.exports = { connectToMongo, getMongoCollection, insertUser, readAllScores, insertScore, findUserByUsername, insertSession, findSessionByToken }