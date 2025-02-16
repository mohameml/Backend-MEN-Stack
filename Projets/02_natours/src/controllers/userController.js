const catchAsync = require('../utils/catchAsync')
const User = require('../models/userModel');
const AppError = require('../Error/AppError');
const Factory = require('./handlerFactory')

// Create User  : is not allowod use /signup 
const createUser = (req, res, next) => {

    res.status(400).json({
        status: 'fail',
        message: 'This route is not defined! Please use /signup instead'
    })
}


//  Read  : 
const getUser = Factory.getOne(User);

const getAllUsers = Factory.getAll(User);

// Do not update password with this : only for admin 
const updateUser = Factory.updateOne(User);

// Delte user for admin : 
const deleteUser = Factory.deleteOne(User);



const filterObj = (obj, ...allowedFields) => {

    const newObj = {};

    Object.keys(obj).forEach(ele => {

        if (allowedFields.includes(ele)) {
            newObj[ele] = obj[ele];
        }
    })

    return newObj;
}


// ReadMe for user : 

const setUserIdInParams = (req, res, next) => {

    req.params.id = req.user.id;
    next();
}

const getMe = Factory.getOne(User);


// UpdateMe for user : 
const updateMe = catchAsync(async (req, res, next) => {

    // 1) Create Error if user POST password data 
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError("This route is not for password update. Please use /updateMyPassworde", 400));
    }

    // 2) Filter the fields allowed to update :

    const filterBody = filterObj(req.body, 'name', 'email');


    // 3)  Update user document :
    const user = await User.findByIdAndUpdate(req.user.id, filterBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })


});

// DeleteMe for user : 
const deleteMe = catchAsync(async (req, res, next) => {

    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
        status: 'success',
        data: null
    });

});




module.exports = {
    setUserIdInParams,
    getMe,
    updateMe,
    deleteMe,
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
};
