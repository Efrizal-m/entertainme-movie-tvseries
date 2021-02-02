const TvSeries = require('../models/tvSeries')

class TvSeriesController {
    static find(req, res, next) {
        TvSeries.find()
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
        TvSeries.findOne(id)
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

        TvSeries.create(payload)
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

        TvSeries.update(id, payload)
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
        TvSeries.delete(id)
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

module.exports = TvSeriesController