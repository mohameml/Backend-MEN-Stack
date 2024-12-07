const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

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

    if (!tour) {
        res.status(400).json({
            status: 'failed',
            message: `user with id ${id} not found`,
        });
    } else {
        res.status(200).json({
            stataus: 'success',
            data: {
                tour: tour,
            },
        });
    }
};

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours, null, 4),
        (err) => {
            if (!err) {
                res.status(201).json({
                    status: 'success',
                    data: {
                        tour: newTour,
                    },
                });
            }
        }
    );
};

const updateTour = (req, res) => {
    const id = req.params.id * 1;
    const proptToUpdate = req.body;

    let tour = tours.find((ele) => ele.id === id);

    if (!tour) {
        res.status(404).json({
            status: 'fail',
            message: `user with id ${id} not found`,
        });
    } else {
        Object.assign(tour, proptToUpdate);
        tours[id] = tour;

        fs.writeFile(
            `${__dirname}/dev-data/data/tours-simple.json`,
            JSON.stringify(tours, null, 4),
            (err) => {
                res.status(200).json({
                    status: 'success',
                    data: {
                        tour: tour,
                    },
                });
            }
        );
    }
};

const deleteTour = (req, res) => {
    const id = req.params.id * 1;

    let tour = tours.find((ele) => ele.id === id);

    if (!tour) {
        res.status(404).json({
            status: 'fail',
            message: `user with id ${id} not found`,
        });
    } else {
        tours.splice(id, 1);
        fs.writeFile(
            `${__dirname}/dev-data/data/tours-simple.json`,
            JSON.stringify(tours, null, 4),
            (err) => {
                res.status(204).json({
                    status: 'success',
                    results: tours.length,
                    data: null,
                });
            }
        );
    }
};

module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour };
