const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../Error/AppError')

const getAllTours = catchAsync(async (req, res, next) => {

    const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .select()
        .page();

    const tours = await features.query;

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        },
    });

});

const getTour = catchAsync(async (req, res, next) => {

    // Tour.findOne({_id : req.params.id})
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
        next(new AppError(`No tour with the id : ${req.params.id}`, 404));
        return;
    }

    res.status(200).json({
        stataus: 'success',
        data: {
            tour: tour,
        },
    });

});




const createTour = catchAsync(async (req, res, next) => {

    const tour = await Tour.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            tour: tour,
        },
    });
})

const updateTour = catchAsync(async (req, res, next) => {

    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!tour) {
        return next(new AppError(`No tour with the id : ${req.params.id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });

});

const deleteTour = catchAsync(async (req, res, next) => {

    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
        return next(new AppError(`No tour with the id : ${req.params.id}`, 404));
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });

});

// /api/v1/tours?sort=ratingsAverage,price&limit=5
const aliasTopTours = (req, res, next) => {
    req.query.sort = '-ratingsAverage,price';
    req.query.limit = '5';
    req.query.fields = 'name,price,ratingsAverage,summary,diffuclty';
    next();
}


const getToursStats = catchAsync(async (req, res, next) => {

    const stats = await Tour.aggregate([
        {
            $match: { ratingsAverage: { $gte: 4.5 } }
        },
        {

            $group: {
                _id: { $toUpper: '$difficulty' },
                numTours: { $sum: 1 },
                numRating: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                maxPrice: { $max: '$price' },
                minPrice: { $min: '$price' }

            }
        },
    ])

    res.status(200).json({
        status: 'success',
        data: {
            stats: stats
        }
    })


});


const getMaxPrice = catchAsync(async (req, res, next) => {

    const maxPrice = await Tour.aggregate([
        {
            $group: {
                _id: null,
                maxPrice: { $max: '$price' }
            }
        }
    ])
    res.status(200).json({
        status: 'success',
        data: {
            maxPrice: maxPrice
        }
    })

});


const getMinPrice = catchAsync(async (req, res, next) => {

    const minPrice = await Tour.aggregate([
        {
            $group: {
                _id: null,
                minPrice: { $min: '$price' }
            }
        }
    ])

    res.status(200).json({
        status: 'success',
        data: {
            minPrice: minPrice
        }
    })


});

// mooth that have the most Travel 
const getMonthlyPlan = catchAsync(async (req, res, next) => {

    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numTourStarts: { $sum: 1 },
                tours: { $push: '$name' },
            }
        },
        {
            $addFields: { moath: '$_id' }
        },
        {
            $project: { _id: 0 }
        },
        {
            $sort: { numTourStarts: - 1 }
        },
        {
            $limit: 12
        }
    ])

    res.status(200).json({
        status: 'success',
        length: plan.length,
        data: {
            plan: plan
        }
    })

});

module.exports = {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
    aliasTopTours,
    getToursStats,
    getMaxPrice,
    getMinPrice,
    getMonthlyPlan
};
