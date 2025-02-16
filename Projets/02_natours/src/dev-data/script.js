// this script is for population the database from the dev-data/data/tours
require('dotenv').config({ path: '../config.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');


const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
);


mongoose.connect(DB).then(() => console.log('DB Connection successful !'));

// READ JSON File Data : 

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/data/tours.json`, 'utf-8'),
);


const users = JSON.parse(
    fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8'),
);

const reviews = JSON.parse(
    fs.readFileSync(`${__dirname}/data/reviews.json`, 'utf-8'),
);


const importAllData = async (Model, data) => {

    try {
        // const promises = data.map((ele) => Tour.create(ele));
        // const res = await Promise.all(promises);
        await Model.create(data, { validateBeforeSave: false });
        console.log('Data successfully imported');
    } catch (error) {
        console.log(error);
    }
};

const DeleteData = async (Model) => {
    try {
        // Remove All data :
        await Model.deleteMany();
        console.log('Data successfully deleted');
    } catch (error) {
        console.log(error);
    }
};

const main = async () => {
    // first Remove all data :
    if (process.argv[2] === '--import') {
        await importAllData(Tour, tours);
        await importAllData(User, users);
        await importAllData(Review, reviews);

    } else if (process.argv[2] === '--delete') {
        await DeleteData(Tour);
        await DeleteData(User);
        await DeleteData(Review);

    } else {
        console.log("you must run with this format : node main.js --delete or --import");
        process.exit(1);
    }

    process.exit(0); // Quitte le processus une fois toutes les opérations terminées
};


main();
