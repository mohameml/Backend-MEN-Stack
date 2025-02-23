const Booking = require('../models/bookingModel')
const catchAsync = require('../utils/catchAsync')
const Tour = require('../models/tourModel');
const Factory = require('./handlerFactory');
const AppError = require('../Error/AppError');
const stripe = require('stripe')(process.env.STRIPE_KEY_SECRET)


const getCheckoutSession = catchAsync(async (req, res, next) => {

    // 1) Get the currently booked tour : 
    const tour = await Tour.findById(req.params.tourId);

    if (!tour) {
        return next(new AppError('No tour found', 400));
    }

    // 2) Create checkout session 

    const successUrl = `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user._id}&price=${tour.price}`;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: successUrl, // Home page 
        cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
        customer_email: req.user.email,  // Tu peux aussi utiliser `customer` si tu as un ID Stripe
        client_reference_id: req.params.tourId,
        mode: 'payment',  // Obligatoire maintenant
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    unit_amount: tour.price * 100,  // Stripe attend un montant en centimes
                    product_data: {
                        name: `${tour.name} Tour`,
                        description: tour.summary,
                        images: [`https://natours.dev/img/tours/${tour.imageCover}`]
                    }
                },
                quantity: 1
            }
        ]
    });


    // 3) Create session as response 
    res.status(200).json({
        status: 'success',
        session
    })
});

const createBookingCheckout = catchAsync(async (req, res, next) => {

    // this is only for dev mode : is not secure : evryone can make booking without paying :

    const { tour, user, price } = req.query;

    if (!tour || !user || !price) return next();

    await Booking.create({
        tour: tour,
        user: user,
        price: price
    });

    const homeUrl = req.originalUrl.split('?')[0];
    res.redirect(homeUrl);
});


const getAllsBooking = Factory.getAll(Booking);
const createBooking = Factory.createOne(Booking);
const getBooking = Factory.getOne(Booking);
const updateBooking = Factory.updateOne(Booking);
const deleteBooking = Factory.deleteOne(Booking);


module.exports = {
    getCheckoutSession,
    createBookingCheckout,
    createBooking,
    getBooking,
    updateBooking,
    deleteBooking,
    getAllsBooking
}