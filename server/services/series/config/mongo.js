const { MongoClient } = require("mongodb")
const url = "mongodb://localhost:27017"
// const url = "mongodb://cluster0-shard-00-01.ukwdn.mongodb.net:27017"
const dbName = "entertainme"
const client = new MongoClient(url, { useUnifiedTopology: true })
client.connect()

const db = client.db(dbName)

module.exports = db