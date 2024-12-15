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
            status: 'sucess',
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


module.exports = {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
    aliasTopTours
};
