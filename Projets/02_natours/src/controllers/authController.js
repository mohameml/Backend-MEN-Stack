const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
const AppError = require('../Error/AppError')
const { promisify } = require('util')
const crypto = require('crypto')
const Email = require('../utils/email')

const signToken = id => {

    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}


const createAndSendToken = (user, statusCode, res) => {

    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === "production") {
        cookieOptions.secure = true; // work only with HTTPS 
    }

    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token: token,
        data: {
            user: user
        }

    });

}


const signup = catchAsync(async (req, res, next) => {

    // const newUser = await User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     passwordConfirm: req.body.passwordConfirm
    // });

    const newUser = await User.create(req.body);

    const url = `${req.protocol}://${req.get('host')}/me`;

    const email = new Email(newUser, url);

    await email.sendWelcome();

    createAndSendToken(newUser, 201, res);

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

    createAndSendToken(user, 200, res);

});

const logout = (req, res, next) => {

    const cookieOptions = {
        expires: new Date(0),
        httpOnly: true
    }

    res.cookie('jwt', "token", cookieOptions);

    res.status(200).json({
        status: 'success'
    });

}



const protect = catchAsync(async (req, res, next) => {

    let token;

    //  1) Getting token and check of it's there 

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
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
    res.locals.user = user;
    next();


});



const restrictiTo = (...roles) => {


    return (req, res, next) => {
        // roles ["admin" , "lead-guide"] , role = "user"
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You do not have permission to perform this action", 403));
        }

        next();
    }
}


const forgotPassword = catchAsync(async (req, res, next) => {

    // 1) GET user based on POST email 

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new AppError("There no user with email address.", 404));
    }

    // 2) Generate the random reset token 

    const token = user.createPasswordResetToken();

    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email 

    try {

        const url = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${token}`;
        const email = new Email(user, url);

        await email.sendPasswordReset();

        res.status(200).json({
            status: 'success',
            message: 'Token send to email'
        })

    } catch (e) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new AppError("There was an error sending the email. Try again later!", 500));
    }




});

const resetPassword = catchAsync(async (req, res, next) => {

    // 1) Get user based on the token ,

    const hashToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashToken,
        passwordResetExpires: { $gt: Date.now() }
    });



    // 2) If token has not expired , and there is user , set the new password 

    if (!user) {

        return next(new AppError("Token is invalid or has expired", 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3) Update changedPasswordAt property for the user 

    // it is done by pre("save") middelware 

    // 4) Log the user in , send JWT 

    createAndSendToken(user, 200, res);


});


const updatePassword = catchAsync(async (req, res, next) => {

    // 1) Get user from collection 

    const user = await User.findById(req.user.id).select("+password");

    // 2) Check if POST  current password is correct 

    const isPasswordValide = await user.verifyPassword(req.body.passwordCurrent, user.password);
    if (!isPasswordValide) {
        return next(new AppError("Your current password is wrong.", 401));
    }

    // 3) If so , update password 

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // User.findByIdAndUpdate() Will ot Worke ":("  

    // 4) Log user in , send JWT 

    createAndSendToken(user, 200, res);

});


// Only for render page , no errors ! 
const isLoggedIn = async (req, res, next) => {

    if (req.cookies.jwt) {


        try {

            // 1) Verify Token : 

            const token = req.cookies.jwt;
            const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

            // 2) Check if user exists : 

            const user = await User.findById(decode.id);

            if (!user) {
                return next();
            }

            // 3) Check if user changend password after the token was issued 

            if (user.isPasswordChanged(decode.iat)) {

                return next();
            }


            // there is user login : 
            res.locals.user = user;
            return next();
        } catch (e) {
            return next();
        }
    }


    next();
};




module.exports = {
    signup,
    login,
    logout,
    protect,
    restrictiTo,
    forgotPassword,
    resetPassword,
    updatePassword,
    isLoggedIn
}