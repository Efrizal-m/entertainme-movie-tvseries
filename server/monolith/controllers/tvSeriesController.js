const TvSeries = require('../models/tvSeries')

class TvSeriesController {
    static find(req, res, next) {
        TvSeries.find()
        .then(result => {
            res.send(result)
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    static findOne(req, res, next) {
        const { id } = req.params
        TvSeries.findOne(id)
        .then(result => {
            res.send(result)
        })
        .catch(error => {
            console.log(error);
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
            console.log(error);
        })
    }

    static update(req, res, next) {
        const { id } = req.params
        const { title, overview, poster_path, popularity, tags } = req.body
        const payload = { title, overview, poster_path, popularity, tags }

        TvSeries.update(id, payload)
        .then(result => {
            res.status(200)
            res.send({message:'success to update'})
        })
        .catch(error => {
            console.log(error);
        })
    }

    static delete(req, res, next) {
        const { id } = req.params
        TvSeries.delete(id)
        .then(result => {
            res.send({message:'succes to delete'})
        })
        .catch(error => {
            console.log(error);
        })
    }

}

module.exports = TvSeriesController