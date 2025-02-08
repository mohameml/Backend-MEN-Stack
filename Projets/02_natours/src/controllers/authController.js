const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
const AppError = require('../Error/AppError')
const { promisify } = require('util')


const signToken = id => {

    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

const signup = catchAsync(async (req, res, next) => {

    // const newUser = await User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     passwordConfirm: req.body.passwordConfirm
    // });

    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token: token,
        data: {
            user: newUser
        }
    })
})


const login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;


    // 1) check if email and password exist 

    if (!email || !password) {
        return next(new AppError("Please provide email and password !", 400));
    }


    // 2) Check if user exists && password is correct 

    const user = await User.findOne({ email: email }).select("+password");

    const isValidePassword = await user?.verifyPassword(password, user?.password);

    if (!user || !isValidePassword) {
        next(new AppError('Incorrect email or password', 401));
    }

    // 3) if evrything is ok , send token to client 

    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    })

});



const protect = catchAsync(async (req, res, next) => {

    let token;

    //  1) Getting token and check of it's there 

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }


    if (!token) {
        return next(new AppError("Your are not logged in! Please log in to get access", 401));
    }

    // 2) Verification token : token valide 

    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user is still exists 

    const user = await User.findById(decode.id);

    if (!user) {
        return next(new AppError("The user belonging to this token has no longer exist.", 401));
    }

    // 4) Check if user changend password after the token was issued 

    if (user.isPasswordChanged(decode.iat)) {

        return next(new AppError("User recently changed password! Please log in again.", 401));
    }

    // GRANT ACCESS TO PROTECED ROUTE :
    req.user = user;
    next();


});


module.exports = {
    signup,
    login,
    protect
}