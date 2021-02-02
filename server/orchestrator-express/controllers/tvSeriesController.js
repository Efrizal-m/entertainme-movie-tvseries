const TvSeries = require('../models/tvSeries')
const Redis = require('ioredis');
const redis = new Redis()

class TvSeriesController {
    static async find(req, res, next) {
        try {
            const cache = await redis.get("tvSeries")
            if (cache) {
                res.send(JSON.parse(cache))
            } else {
                const tvSeries = await TvSeries.find()
                if (tvSeries.length === 0) {
                    res.status(200)
                    res.send({message: `Data is empty`})
                } else if (!tvSeries) {
                    throw { status: 200, message: `Data not found`}                
                } else {
                    await redis.set("tvSeries", JSON.stringify(tvSeries.data))
                    res.status(200)
                    res.send(tvSeries.data)
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
            const cache = await redis.get("tvSeries")
            if (cache) {
                res.send(JSON.parse(cache))
            } else {
                const tvSeries = await TvSeries.find(id)
                if (!tvSeries) {
                    throw { status: 200, message: `Data not found`}                
                } else {
                    res.status(200)
                    res.send(tvSeries.data)
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
            const tvSeries = await TvSeries.create(payload)
            await redis.del("tvSeries")
            res.status(tvSeries.status)
            res.send(JSON.parse(tvSeries.config.data))
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
            const tvSeries = await TvSeries.update(id, payload)
            await redis.del("tvSeries")
            res.status(tvSeries.statusCode)
            res.send(JSON.parse(tvSeries.data))
        } catch (error) {
            res.status(500)
            res.send({message:error})
        }
    }

    static async delete(req, res, next) {
        const { id } = req.params

        try {
            const tvSeries = await TvSeries.find(id)
            res.status(tvSeries.statusCode)
            res.send(JSON.parse(tvSeries.data))
        } catch (error) {
            res.status(500)
            res.send({message:error})
        }
    }
}

module.exports = TvSeriesController