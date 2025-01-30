const express = require('express');
const morgan = require('morgan');
const tourRoute = require('./routes/tourRoutes');
const userRoute = require('./routes/userRoutes');
const AppError = require('./Error/AppError')
const globalErrorHandler = require("./controllers/errorController")

// App :

const app = express();

//  MIDDELWARE

if (process.env.NODE_ENV === 'developement') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


// ROUTES

app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);



// Error Handling  

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl}`, 400))
})

app.use(globalErrorHandler);


module.exports = app;
