const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkID);

router
    .route('/top-5-tours')
    .get(tourController.aliasTopTours, tourController.getAllTours)

router
    .route('/tour-stats')
    .get(tourController.getToursStats);


router
    .route('/max-price')
    .get(tourController.getMaxPrice);


router
    .route('/min-price')
    .get(tourController.getMinPrice);

router
    .route('/monthly-plan/:year')
    .get(tourController.getMonthlyPlan);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;
