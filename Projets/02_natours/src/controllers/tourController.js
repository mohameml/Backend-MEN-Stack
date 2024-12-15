const Tour = require('../models/tourModel');

/**
 * Advance Filtring : 
 * 
 */

const getAllTours = async (req, res) => {

    console.log(req.query);
    try {
        // Build Query : 

        // ==== 1. filter ===
        const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', ' fields'];
        excludeFields.forEach(ele => delete queryObj[ele])

        // ==== 2. Advance filter ===

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        // {difficulty : 'easy' , duration : {$gte : 25}}
        // { difficulty: 'easy', duration: { gte: '5' } } 


        const query = Tour.find(JSON.parse(queryStr));
        // Executer the query : 
        const tours = await query;

        // send the response : 
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours: tours,
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

module.exports = {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
};
