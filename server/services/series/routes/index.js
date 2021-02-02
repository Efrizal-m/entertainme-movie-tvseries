const router = require('express').Router()
const TvSeriesController = require('../controllers/tvSeriesController')

router.get('/tvSeries', TvSeriesController.find)
router.post('/tvSeries', TvSeriesController.create)
router.get('/tvSeries/:id', TvSeriesController.findOne)
router.put('/tvSeries/:id', TvSeriesController.update)
router.delete('/tvSeries/:id', TvSeriesController.delete)

module.exports = router