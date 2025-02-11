const express = require('express');
const morgan = require('morgan');
const tourRoute = require('./routes/tourRoutes');
const userRoute = require('./routes/userRoutes');
const AppError = require('./Error/AppError')
const hpp = require("hpp")
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize');
const sanitizeHtml = require("sanitize-html");
const globalErrorHandler = require("./controllers/errorController")

// App :

const app = express();

//  MIDDELWARE


// Security HTTP Headers :in the first fot security  
app.use(helmet());


// rate-limiting : allow 100 req per 1h from the some IP  : 100 req / 1h 
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many req from this IP , please try again in an hour !'
})

app.use("/api", limiter);


// for logging in dev env : 
if (process.env.NODE_ENV === 'developement') {
    app.use(morgan('dev'));
}


// for json parser :
app.use(express.json({ limit: '10kb' }));


// Data Sanitization against NoSQL query injection : 
app.use(mongoSanitize());

// Data Sanitization against XSS : 

const cleanInput = (req, res, next) => {
    if (req.body) {
        for (const key in req.body) {
            console.log(req.body[key]);
            req.body[key] = sanitizeHtml(req.body[key]); // Nettoie chaque champ du body
            console.log(req.body[key]);

        }
    }
    next();
};

app.use(cleanInput);


// hpp : HTPP Parametre Pollution :

app.use(hpp({
    whitelist: [
        "duration",
        "ratingsAverage",
        "ratingsQuantity",
        "price",
        "maxGroupSize",
        "difficulty"
    ]
}));


// for static file :
app.use(express.static(`${__dirname}/public`));


// custom middelware to add time :
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
