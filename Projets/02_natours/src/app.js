const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours,
        },
    });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours, null, 4),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour,
                },
            });
        }
    );
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

app.delete('/api/v1/tours/:id', (req, res) => {
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
                res.status(200).json({
                    status: 'success',
                    results: tours.length,
                    data: {
                        tours: tours,
                    },
                });
            }
        );
    }
});

const PORT = 3000;
app.listen(PORT, '127.0.0.1', () => {
    console.log(`App running on port ${PORT} ... `);
});
