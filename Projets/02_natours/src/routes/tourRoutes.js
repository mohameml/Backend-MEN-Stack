const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController')

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
    .get(authController.protect, tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(authController.protect, authController.restrictiTo("admin", "lead-guide"), tourController.deleteTour);

module.exports = router;
