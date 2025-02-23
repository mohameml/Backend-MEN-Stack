const path = require('path')
const express = require('express');
const morgan = require('morgan');
const hpp = require("hpp")
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize');
const sanitizeHtml = require("sanitize-html");
const cors = require('cors')
const cookieParser = require('cookie-parser')

const tourRoute = require('./routes/tourRoutes');
const userRoute = require('./routes/userRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const viewRoute = require('./routes/viewRouter')
const bookingRoute = require('./routes/bookingRoutes');
const globalErrorHandler = require("./controllers/errorController")

const AppError = require('./Error/AppError')



// ============ App : ====================
const app = express();




// ================ View engien : =================

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // foler for view 
app.use(express.static(path.join(__dirname, 'public'))); // for static file 



// ============================ MIDDELWARE : ===================


app.use(cors())

// Security HTTP Headers :in the first fot security  
app.use(helmet());
// Set security HTTP headers
// app.use(
//     helmet({
//         contentSecurityPolicy: {
//             directives: {
//                 defaultSrc: ["'self'", 'data:', 'blob:', 'https:', 'ws:'],
//                 baseUri: ["'self'"],
//                 fontSrc: ["'self'", 'https:', 'data:'],
//                 scriptSrc: [
//                     "'self'",
//                     'https:',
//                     'http:',
//                     'blob:',
//                     'https://*.mapbox.com',
//                     'https://js.stripe.com',
//                     'https://m.stripe.network',
//                     'https://*.cloudflare.com',
//                 ],
//                 frameSrc: ["'self'", 'https://js.stripe.com'],
//                 objectSrc: ["'none'"],
//                 styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
//                 workerSrc: [
//                     "'self'",
//                     'data:',
//                     'blob:',
//                     'https://*.tiles.mapbox.com',
//                     'https://api.mapbox.com',
//                     'https://events.mapbox.com',
//                     'https://m.stripe.network',
//                 ],
//                 childSrc: ["'self'", 'blob:'],
//                 imgSrc: ["'self'", 'data:', 'blob:'],
//                 formAction: ["'self'"],
//                 connectSrc: [
//                     "'self'",
//                     "'unsafe-inline'",
//                     'data:',
//                     'blob:',
//                     'https://*.stripe.com',
//                     'https://*.mapbox.com',
//                     'https://*.cloudflare.com/',
//                     'https://bundle.js:*',
//                     'ws://127.0.0.1:*/',

//                 ],
//                 upgradeInsecureRequests: [],
//             },
//         },
//     })
// );

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

// permert de parser application/x-ww-urlencoded from HTML Form : 
app.use(express.urlencoded({
    extended: true,
    limit: '10kb'
}));
app.use(cookieParser())

// Data Sanitization against NoSQL query injection : 
app.use(mongoSanitize());

// Data Sanitization against XSS : 

const cleanInput = (req, res, next) => {
    if (req.body) {
        for (const key in req.body) {
            req.body[key] = sanitizeHtml(req.body[key]); // Nettoie chaque champ du body

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


// custom middelware to add time :
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});




// ============================ ROUTES for API  : ======================================

app.use('/', viewRoute); // route for middelware for  SSR  
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/bookings', bookingRoute);


// =========================== Error Handling : =================================

app.all('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
        next(new AppError(`Can't find ${req.originalUrl}`, 400))
    } else {
        next(new AppError(`404 Page not found !!`, 400))
    }
})

app.use(globalErrorHandler);




module.exports = app;
