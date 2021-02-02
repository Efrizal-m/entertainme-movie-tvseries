const Movie = require('../models/movie')
const Redis = require('ioredis');
const redis = new Redis()

class MovieController {
    static async find(req, res, next) {
        try {
            const cache = await redis.get("movies")
            if (cache) {
                res.send(JSON.parse(cache))
            } else {
                const movies = await Movie.find()
                if (movies.length === 0) {
                    res.status(200)
                    res.send({message: `Data is empty`})
                } else if (!movies) {
                    throw { status: 200, message: `Data not found`}                
                } else {
                    await redis.set("movies", JSON.stringify(movies.data))
                    res.status(200)
                    res.send(movies.data)
                }                
            }
        } catch (error) {
            res.status(500)
            res.send({message:error})
        }
    }
    
    static async findOne(req, res, next) {
        const { id } = req.params
        try {
            const cache = await redis.get("movies")
            if (cache) {
                const data = JSON.parse(cache)
                const movie = data.find(el => { return el._id === id })
                res.status(200)
                res.send(movie)
            } else {
                const movie = await Movie.find(id)
                if (!movie) {
                    throw { status: 200, message: `Data not found`}                
                } else {
                    res.status(200)
                    res.send(movie.data)
                }                
            }
        } catch (error) {
            res.status(500)
            res.send({message:error})
        }
    }

    static async create(req, res, next) {
        const { title, overview, poster_path, popularity, tags } = req.body
        const payload = { title, overview, poster_path, popularity, tags }

        try {
            const movie = await Movie.create(payload)
            await redis.del("movies")
            res.status(movie.status)
            res.send(JSON.parse(movie.config.data))
        } catch (error) {
            res.status(500)
            res.send({message:error})
        }
    }

    static async update(req, res, next) {
        const { id } = req.params
        const { title, overview, poster_path, popularity, tags } = req.body
        const payload = { title, overview, poster_path, popularity, tags }

        try {
            const movie = await Movie.update(id, payload)
            await redis.del("movies")
            res.status(movie.statusCode)
            res.send(JSON.parse(movie.data))
        } catch (error) {
            res.status(500)
            res.send({message:error})
        }
    }

    static async delete(req, res, next) {
        const { id } = req.params

        try {
            const movie = await Movie.find(id)
            res.status(movie.statusCode)
            res.send(JSON.parse(movie.data))
        } catch (error) {
            res.status(500)
            res.send({message:error})
        }
    }
}

module.exports = MovieController