const fs = require('fs');
const saveAndSendData = require('../utils/saveAndSendData');
const path = `${__dirname}/../dev-data/data/tours-simple.json`;

const tours = JSON.parse(fs.readFileSync(path));

const checkID = (req, res, next, val) => {
    const tour = tours.find((ele) => ele.id === parseInt(val));

    if (!tour) {
        return res.status(400).json({
            status: 'failed',
            message: `checkID : tour with id ${val} not found`,
        });
    }
    next();
};

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours,
        },
    });
};

const getTour = (req, res) => {
    const id = +req.params.id;
    const tour = tours.find((ele) => ele.id === id);
    res.status(200).json({
        stataus: 'success',
        data: {
            tour: tour,
        },
    });
};

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);
    saveAndSendData(path, tours, res, 201, {
        status: 'success',
        data: {
            tour: newTour,
        },
    });
};

const updateTour = (req, res) => {
    const id = parseInt(req.params.id);
    const proptToUpdate = req.body;

    let tour = tours.find((ele) => ele.id === id);

    Object.assign(tour, proptToUpdate);
    tours[id] = tour;

    saveAndSendData(path, tours, res, 200, {
        status: 'success',
        data: {
            tour: tour,
        },
    });
};

const deleteTour = (req, res) => {
    const id = req.params.id * 1;
    tours.splice(id, 1);
    saveAndSendData(path, tours, res, 204, {
        status: 'success',
        results: tours.length,
        data: null,
    });
};

const checkBody = (req, res, next) => {
    let body = req.body;

    if (!body.name || !body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'body does not contains name or price',
        });
    }

    next();
};

module.exports = {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
    checkID,
    checkBody,
};
