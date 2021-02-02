const Movie = require('../models/movie')

class MovieController {
    static find(req, res, next) {
        Movie.find()
        .then(result => {
            res.status(200)
            res.send(result)
        })
        .catch(error => {
            res.status(500)
            res.send({message:'Internal Server Error'})
        })
    }
    
    static findOne(req, res, next) {
        const { id } = req.params
        Movie.findOne(id)
        .then(result => {
            res.status(200)
            res.send(result)
        })
        .catch(error => {
            res.status(500)
            res.send({message:'Internal Server Error'})
        })
    }

    static create(req, res, next) {
        const { title, overview, poster_path, popularity, tags } = req.body
        const payload = { title, overview, poster_path, popularity, tags }

        Movie.create(payload)
        .then(result => {
            res.status(201)
            res.send(result.ops[0])
        })
        .catch(error => {
            res.status(500)
            res.send({message:'Internal Server Error'})
        })
    }

    static update(req, res, next) {
        const { id } = req.params
        const { title, overview, poster_path, popularity, tags } = req.body
        const payload = { title, overview, poster_path, popularity, tags }

        Movie.update(id, payload)
        .then(result => {
            res.status(200)
            res.send(result.value)
        })
        .catch(error => {
            res.status(500)
            res.send({message:'Internal Server Error'})
        })
    }

    static delete(req, res, next) {
        const { id } = req.params
        Movie.delete(id)
        .then(result => {
            res.status(200)
            res.send({_id:id, message:'succes to delete'})
        })
        .catch(error => {
            res.status(500)
            res.send({message:'Internal Server Error'})
        })
    }

}

module.exports = MovieController