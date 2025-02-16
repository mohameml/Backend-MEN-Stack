const express = require('express')
const reviewController = require('../controllers/reviewController')
const authController = require('../controllers/authController')

const router = express.Router({ mergeParams: true })


//  POST /reviews
//  GET /reviews
//  POST reviews/idReview

//  POST /tours/idTour/reviews
//  GET /tours/idTour/reviews
//  POST /tours/idTour/reviews/idReview

// =============== must to be auth =================

router.use(authController.protect);


// ======================= router home : / ======================

router
    .route('/')
    .get(
        reviewController.setTourIdInReqQuery,
        reviewController.getAllReview
    )
    .post(
        authController.restrictiTo("user"),
        reviewController.setTourUserIds,
        reviewController.createReview
    )


// ============ router with params : id ========================

router
    .route('/:id')
    .get(reviewController.getReview)
    .patch(authController.restrictiTo("user", "admin"), reviewController.checkIsAuthor, reviewController.updateReview)
    .delete(authController.restrictiTo("user", "admin"), reviewController.checkIsAuthor, reviewController.deleteReview)


module.exports = router 