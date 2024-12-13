// this script is for population the database from the dev-data/data/tours
require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../models/tourModel');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('DB Connection successful !'));

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8'),
);

const importAllData = async (data) => {
    try {
        // const promises = data.map((ele) => Tour.create(ele));
        // const res = await Promise.all(promises);
        await Tour.create(data);
        console.log('Data successfully imported');
        process.exit(0);
    } catch (error) {
        console.log(error);
    }
};

const DeleteData = async () => {
    try {
        // Remove All data :
        await Tour.deleteMany();
        console.log('Data successfully deleted');
        process.exit(0);
    } catch (error) {
        console.log(error);
    }
};

const main = async () => {
    // first Remove all data :
    if (process.argv[2] === '--import') {
        await importAllData(tours);
    } else if (process.argv[2] === '--delete') {
        DeleteData();
    } else {
        await console.log(process.argv[2]);
    }
};

// main().then(() => process.exit());
main();
