const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../Error/AppError');

const getOverview = catchAsync(async (req, res, next) => {

    // 1) Get tour data from collection
    const tours = await Tour.find();

    // 2) Build template
    // 3) Render that template using tour data from 1)
    res.status(200).render('overview', {
        title: 'All Tours',
        tours
    });
});

const getMyTours = catchAsync(async (req, res, next) => {

    const bookings = await Booking.find({
        user: req.user._id
    });

    const toursPromise = bookings.map(async book => {
        const tour = await Tour.findById(book.tour);
        return tour;
    });

    const tours = await Promise.all(toursPromise);


    res.status(200).render('overview', {
        title: 'Your Tours',
        tours
    });


});


const getAllTours = async (req, res, next) => {
    // 1) Get tour data from collection
    const tours = await Tour.find();
    res.status(200).render('tours', {
        title: 'All Tours',
        products: tours
    });
}

const getTour = catchAsync(async (req, res, next) => {

    // 1) Get the data, for the requested tour (including reviews and guides)

    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
        path: 'reviews',
        fields: 'review rating user'
    });

    if (!tour) {
        return next(new AppError('There is no tour with that name.', 404));
    }


    // 2) Build template
    // 3) Render template using data from 1)
    res
        .status(200)
        .set(
            'Content-Security-Policy',
            'connect-src https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com http://127.0.0.1:3000/'
        )
        .render('tour', {
            title: `${tour.name} Tour`,
            tour
        });
});

const getLoginForm = (req, res, next) => {
    res
        .status(200)
        .set(
            'Content-Security-Policy',
            "connect-src 'self' https://cdnjs.cloudflare.com http://127.0.0.1:3000/"
        )
        .render('login', {
            title: 'Log into your account'
        });
};

const getSignupForm = (req, res, next) => {
    res.status(200).render('signup', {
        title: 'SignUp Page'
    })
}

const handelLogout = (req, res, next) => {
    res.status(200).json({
        msg: 'Logout'
    })
}


const getAccount = (req, res, next) => {
    res.status(200).render('account', {
        title: 'Your account',
    });
};

const updateUserData = catchAsync(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
            name: req.body.name,
            email: req.body.email
        },
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).render('account', {
        title: 'Your account',
        user: updatedUser
    });
});


module.exports = {
    getOverview,
    getTour,
    getLoginForm,
    getSignupForm,
    getAccount,
    updateUserData,
    handelLogout,
    getAllTours,
    getMyTours

}
