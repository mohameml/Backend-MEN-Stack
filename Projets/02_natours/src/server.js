require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');


process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION 🎆🎆🎆 Shutting down ...');
    console.log(err.name, err.message);
    process.exit(1);

})

const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB)
    .then(() => console.log('DB Connection successful !'))
    .catch(() => console.log('ERROR 🔥'))


const port = process.env.PORT || 3000;
const server = app.listen(port, '127.0.0.1', () => {
    console.log(`App running on port ${port} ... `);
});


process.on('unhandledRejection', err => {
    console.log('UNHANDEL REJECTION 🎆🎆🎆 Shutting down ...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);

    });
})
