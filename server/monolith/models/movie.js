const db = require('../config/mongo')
const Movie = db.collection('movies')
const { ObjectId } = require("mongodb")

// db.createCollection("movies", {
//     validator: {
//        $jsonSchema: {
//           bsonType: "object",
//           required: [ "title", "overview", "poster_path", "popularity", "tags" ],
//           properties: {
//              title: {
//                 bsonType: "string",
//                 description: "must be a string and is required"
//              },
//              overview: {
//                 bsonType: "string",
//                 description: "must be a string and is required"
//              },
//              poster_path: {
//                 bsonType: "string",
//                 description: "must be a string and is required"
//              },
//              popularity: {
//                 bsonType: "double",
//                 description: "must be a double and is required"
//              },
//              tags: {
//                 bsonType: "array",
//                 description: "must be an array and is required"
//              }
//           }
//        }
//     }
//  })

class MovieModel {
    static find(){
        return Movie.find().toArray()
    }

    static findOne(id){
        return Movie.findOne({"_id" : ObjectId(`${id}`)})
    }


    static create(payload){
        return Movie.insertOne(payload)
    }

    static update(id, payload){
        const { title, overview, poster_path, popularity, tags } = payload
        return Movie.updateOne({"_id" : ObjectId(`${id}`)}, {$set: {"title":title, "overview":overview, "poster_path":poster_path, "popularity":popularity, "tags":tags}})
    }

    static delete(id){
        return Movie.deleteOne({"_id" : ObjectId(`${id}`)})
    }   
}

module.exports = MovieModel