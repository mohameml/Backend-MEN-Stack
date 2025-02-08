const catchAsync = require('../utils/catchAsync')
const User = require('../models/userModel');
const AppError = require('../Error/AppError');




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

const getUser = (req, res) => {
    let id = req.params.id;

    let user = users.find((ele) => ele._id === id);

    res.status(200).json({
        status: 'success',
        data: {
            user: user,
        },
    });
};

const createUser = (req, res) => {
    const id = base64id.generateId();
    const user = Object.assign({ _id: id }, req.body);
    users.push(user);
    saveAndSendData(path, users, res, 201, {
        status: 'success',
        data: {
            user: user,
        },
    });
};

const updateUser = (req, res) => {
    let id = req.params.id;
    let user = users.find((ele) => ele._id === id);
    let index = users.indexOf(user);
    Object.assign(user, req.body);
    users[index] = user;

    saveAndSendData(path, users, res, 200, {
        status: 'success',
        data: {
            user: user,
        },
    });
};




const deleteUser = async (req, res, next) => {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new AppError(`No user found`, 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
}


module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
