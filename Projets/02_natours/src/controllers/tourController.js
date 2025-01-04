const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures')

const getAllTours = async (req, res) => {

    try {

        const features = new APIFeatures(Tour.find(), req.query)
            .filter()
            .sort()
            .select()
            .page();

        const tours = await features.query;

        // send the response : 
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

const getTour = async (req, res) => {
    try {
        // Tour.findOne({_id : req.params.id})
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            stataus: 'success',
            data: {
                tour: tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

const createTour = async (req, res) => {
    try {
        const tour = await Tour.create(req.body);
        // console.log('tour was created successfuly ');
        // console.log(tour);
        res.status(201).json({
            status: 'success',
            data: {
                tour: tour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

const updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

const deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error,
        });
    }
};

// /api/v1/tours?sort=ratingsAverage,price&limit=5
const aliasTopTours = (req, res, next) => {
    req.query.sort = '-ratingsAverage,price';
    req.query.limit = '5';
    req.query.fields = 'name,price,ratingsAverage,summary,diffuclty';
    next();
}


const getToursStats = async (req, res) => {

    try {
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
            {
                $addFields: {
                    order: {
                        $switch: {
                            branches: [
                                { case: { $eq: ['$_id', 'EASY'] }, then: 1 },
                                { case: { $eq: ['$_id', 'MEDIUM'] }, then: 2 },
                                { case: { $eq: ['$_id', 'DIFFICULT'] }, then: 3 }
                            ],
                            default: 4 // In case there are unexpected values
                        }
                    }
                }
            },
            // Sort by the custom order
            {
                $sort: { order: 1 }
            },
            {
                $match: { _id: { $ne: 'EASY' } }
            }

        ])

        res.status(200).json({
            status: 'success',
            data: {
                stats: stats
            }
        })

    } catch (e) {
        res.status(400).json({
            status: 'fail',
            message: e,
        });
    }
}

module.exports = {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
    aliasTopTours,
    getToursStats
};
