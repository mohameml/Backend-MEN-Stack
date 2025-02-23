const catchAsync = require('../utils/catchAsync')
const User = require('../models/userModel');
const AppError = require('../Error/AppError');
const Factory = require('./handlerFactory')
const multer = require('multer')
const sharp = require('sharp')


// ========= multer for Uploding imges : ===============


// ============= config and init Multer ================

// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/img/users');
//     },
//     filename: (req, file, cb) => {
//         // user-_id-timestep.jpeg 
//         const ext = file.mimetype.split('/')[1];
//         const fileName = `user-${req.user._id}-${Date.now()}.${ext}`;
//         cb(null, fileName);
//     }
// });

const multerStorage = multer.memoryStorage();

const multerFiletr = (req, file, cb) => {

    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images', 400), false)
    }
}


const upload = multer({
    storage: multerStorage,
    fileFilter: multerFiletr
})


// middelware for uploadPhoto : 
const uploadUserPhoto = upload.single('photo');

// middelware for image processing for user photo : 
const resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    const fileName = `user-${req.user._id}-${Date.now()}.jpeg`;
    req.file.filename = fileName;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({
            quality: 90
        })
        .toFile(`public/img/users/${fileName}`);

    next();
});


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
    if (req.file) filterBody.photo = req.file.filename

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
    uploadUserPhoto,
    resizeUserPhoto
};
