const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController')
const reviweRouter = require('../routes/reviewRoutes')

const router = express.Router();




// ================== route home : /  =======================

router
    .route('/')
    .get(tourController.getAllTours)
    .post(authController.protect, authController.restrictiTo("admin", "lead-guide"), tourController.createTour);



// =====================  tour stats : ===================

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
    .get(authController.protect, authController.restrictiTo("admin", "lead-guide", "guide"), tourController.getMonthlyPlan);


// /tours-within/50/center/-40,67/unit/km
router
    .route('/tours-within/:distance/center/:latlng/unit/:unit')
    .get(tourController.getToursWithin)


router
    .route('/distances/:latlng/unit/:unit')
    .get(tourController.getDistances);

// ==================== route with id params : =================================

router
    .route('/:id')
    .get(
        tourController.getTour
    )
    .patch(
        authController.protect,
        authController.restrictiTo("admin", "lead-guide"),
        tourController.uploadToursImages,
        tourController.resizeTourImages,
        tourController.updateTour
    )
    .delete(
        authController.protect,
        authController.restrictiTo("admin", "lead-guide"),
        tourController.deleteTour
    );


// ==================== nested Router for reviwes =================

router.use('/:tourId/reviews', reviweRouter)


module.exports = router;
