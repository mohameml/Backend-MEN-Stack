const fs = require('fs');
const base64id = require('base64id');
const saveAndSendData = require('../utils/saveAndSendData');

const path = `${__dirname}/../dev-data/data/users.json`;
const users = JSON.parse(fs.readFileSync(path));

const checkID = (req, res, next, val) => {
    let user = users.find((ele) => ele._id === val);

    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: `checkID : user with id ${val} not found`,
        });
    }
    next();
};

const getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users: users,
        },
    });
};

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
    let id = base64id.generateId();
    let user = Object.assign({ _id: id }, req.body);
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

const deleteUser = (req, res) => {
    let id = req.params.id;
    let user = users.find((ele) => ele._id === id);
    let index = users.indexOf(user);

    users.splice(index, 1);
    saveAndSendData(path, users, res, 204, {
        status: 'success',
        results: users.length,
        data: null,
    });
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    checkID,
};
