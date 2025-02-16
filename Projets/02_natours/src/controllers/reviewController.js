const AppError = require('../Error/AppError')
const Review = require('../models/reviewModel')
const Factory = require('./handlerFactory')
const catchAsync = require('./../utils/catchAsync')

// Create : 

const setTourUserIds = (req, res, next) => {

    if (!req.body.tour) req.body.tour = req.params.tourId

    if (!req.body.user) req.body.user = req.user._id

    next();
}


const createReview = Factory.createOne(Review);

// Read : 

const getReview = Factory.getOne(Review);


const setTourIdInReqQuery = (req, res, next) => {

    if (req.params.tourId) req.query.tour = req.params.tourId
    next();
}

const getAllReview = Factory.getAll(Review);

// Update : 
const updateReview = Factory.updateOne(Review);

// Delete : 
const deleteReview = Factory.deleteOne(Review);



// check befor update Review if the user is author : 

const checkIsAuthor = catchAsync(async (req, res, next) => {

    if (req.user.role === "admin") {
        next();
    }

    const review = await Review.findById(req.params.id);

    if (!review) {
        return next(new AppError("No Review with this id"));
    }



    if (review.user._id.toString() !== req.user._id.toString()) {
        return next(new AppError("You can not update this review."));
    }

    next();
})


module.exports = {
    setTourUserIds,
    createReview,
    getReview,
    setTourIdInReqQuery,
    getAllReview,
    checkIsAuthor,
    updateReview,
    deleteReview
}