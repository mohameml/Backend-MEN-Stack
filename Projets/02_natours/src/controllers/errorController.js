const AppError = require("../Error/AppError");

const sendErrorDev = (err, req, res) => {
    console.log(err);

    if (req.originalUrl.startsWith('/api')) {

        // for API : 
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });

    } else {

        // for SSR :
        res.status(err.statusCode).render('error', {
            title: 'Something went wrong !',
            msg: err.message
        });

    }

}


const sendErrorProd = (err, req, res) => {

    // for API : 
    if (req.originalUrl.startsWith('/api')) {

        if (err.isOperational) {

            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }

        console.error('ERROR :', err);
        return res.status(500).json({
            status: 'error',
            message: 'Somthing went very wrong, please try again',
        })

    }


    if (err.isOperational) {

        return res.status(err.statusCode).render('error', {
            msg: err.message
        });
    }

    return res.status(500).render('error', {
        msg: 'Somthing went very wrong, please try again '
    });

}

const handelCastErrorDB = (err) => {

    const message = `Invalid ${err.path} : ${err.value}`;
    return new AppError(message, 400);
}

const handelDuplicateKeyDB = (err) => {
    const message = `Duplicate Key Value  : ${err.keyValue.name} Please use another value !`;
    return new AppError(message, 400);
}

const handelValidationErrorDB = (err) => {

    const errs = Object.values(err.errors).map(ele => ele.message);
    let message = `Invalid input data : ${errs.join('. ')}`;

    return new AppError(message, 400);
}

const handelJWTError = err => new AppError("Invalid token. Please login agian!", 401);


const handelJWTExpireError = err => new AppError("Your token has expired! Please log in again.", 401);

const globaleErrorHandling = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === "developement") {

        sendErrorDev(err, req, res);

    } else if (process.env.NODE_ENV === "production") {

        let error = err;

        if (err.name === 'CastError') {
            error = handelCastErrorDB(err);
        }

        if (err.code === 11000) {
            error = handelDuplicateKeyDB(err);
        }

        if (err.name === "ValidationError") {
            error = handelValidationErrorDB(err);
        }

        if (err.name === "JsonWebTokenError") {
            error = handelJWTError(err);
        }

        if (err.name === "TokenExpiredError") {
            error = handelJWTExpireError(err);
        }

        sendErrorProd(error, req, res);
    }


}


module.exports = globaleErrorHandling;