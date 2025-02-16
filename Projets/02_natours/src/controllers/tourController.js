const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync')
const Factory = require('./handlerFactory')
const AppError = require('../Error/AppError')



// Create Handler for Tour Model : 
const createTour = Factory.createOne(Tour);


// Read : 
const getTour = Factory.getOne(Tour, { path: "reviews" })

const getAllTours = Factory.getAll(Tour);

// Update Handler for Tour Model :
const updateTour = Factory.updateOne(Tour);


// Delete Handler for Tour Model : 
const deleteTour = Factory.deleteOne(Tour);



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

// /tours-within/:distance/center/:latlng/unit/:unit
// /tours-within/30/center/34.035973,-118.301917/unit/mi
const getToursWithin = catchAsync(async (req, res, next) => {

    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(",");

    if (!lat || !lng) {
        return next(new AppError("You must define lat && lag in format : lat,lag", 400));
    }

    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

    const tours = await Tour.find({
        startLocation: {
            $geoWithin: {
                $centerSphere: [
                    [lng, lat],
                    radius
                ]
            }
        }
    });

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });

});


const getDistances = catchAsync(async (req, res, next) => {

    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(",");

    if (!lat || !lng) {
        return next(new AppError("You must define lat && lag in format : lat,lag", 400));
    }

    const multiplier = unit === 'mi' ? 0.00062137 : 0.001;

    // geoNear is the only stage for GroSpatile and must always the first stage in the pipline:
    const distances = await Tour.aggregate([
        {
            $geoNear: {
                // must GeoJSON 
                near: {
                    type: 'Point',
                    coordinates: [lng * 1, lat * 1]
                },
                distanceField: 'distance',
                distanceMultiplier: multiplier
            }
        },
        {
            $project: {
                distance: 1,
                name: 1
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        results: distances.length,
        data: {
            distances
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
    getMonthlyPlan,
    getToursWithin,
    getDistances
};
