const { MongoClient } = require("mongodb")
const url = "mongodb://localhost:27017"
const dbName = "entertainme_series"
const client = new MongoClient(url, { useUnifiedTopology: true })
client.connect()

const db = client.db(dbName)

module.exports = db