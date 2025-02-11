const catchAsync = require('../utils/catchAsync')
const User = require('../models/userModel');
const AppError = require('../Error/AppError');



const filterObj = (obj, ...allowedFields) => {

    const newObj = {};

    Object.keys(obj).forEach(ele => {

        if (allowedFields.includes(ele)) {
            newObj[ele] = obj[ele];
        }
    })

    return newObj;
}


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


const deleteMe = catchAsync(async (req, res, next) => {

    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
        status: 'success',
        data: null
    })


});




const getAllUsers = catchAsync(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users: users,
        },
    });
});



// const getUser = (req, res) => {
//     let id = req.params.id;

//     let user = users.find((ele) => ele._id === id);

//     res.status(200).json({
//         status: 'success',
//         data: {
//             user: user,
//         },
//     });
// };

// const createUser = (req, res) => {
//     const id = base64id.generateId();
//     const user = Object.assign({ _id: id }, req.body);
//     users.push(user);
//     saveAndSendData(path, users, res, 201, {
//         status: 'success',
//         data: {
//             user: user,
//         },
//     });
// };

// const updateUser = (req, res) => {
//     let id = req.params.id;
//     let user = users.find((ele) => ele._id === id);
//     let index = users.indexOf(user);
//     Object.assign(user, req.body);
//     users[index] = user;

//     saveAndSendData(path, users, res, 200, {
//         status: 'success',
//         data: {
//             user: user,
//         },
//     });
// };




// const deleteUser = async (req, res, next) => {

//     const user = await User.findByIdAndDelete(req.params.id);

//     if (!user) {
//         return next(new AppError(`No user found`, 404));
//     }

//     res.status(204).json({
//         status: 'success',
//         data: null
//     })
// }


module.exports = {
    getAllUsers,
    updateMe,
    deleteMe,
    // getUser,
    // createUser,
    // updateUser,
    // deleteUser,
};
