const router = require('express').Router()
const MovieController = require('../controllers/movieController')
const TvSeriesController = require('../controllers/tvSeriesController')

router.get('/movies', MovieController.find)
router.post('/movies', MovieController.create)
router.get('/movies/:id', MovieController.findOne)
router.put('/movies/:id', MovieController.update)
router.delete('/movies/:id', MovieController.delete)

router.get('/tvSeries', TvSeriesController.find)
router.post('/tvSeries', TvSeriesController.create)
router.get('/tvSeries/:id', TvSeriesController.findOne)
router.put('/tvSeries/:id', TvSeriesController.update)
router.delete('/tvSeries/:id', TvSeriesController.delete)

module.exports = router