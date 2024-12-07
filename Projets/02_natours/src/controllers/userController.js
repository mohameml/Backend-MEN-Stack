const fs = require('fs');
const base64id = require('base64id');

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

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

    if (!user) {
        res.status(404).json({
            status: 'fail',
            message: `user with id ${id} not found`,
        });
    } else {
        res.status(200).json({
            status: 'success',
            data: {
                user: user,
            },
        });
    }
};

const createUser = (req, res) => {
    let id = base64id.generateId();
    let user = Object.assign({ _id: id }, req.body);
    users.push(user);
    fs.writeFile(
        `${__dirname}/dev-data/data/users.json`,
        JSON.stringify(users, null, 4),
        (err) => {
            if (!err) {
                res.status(201).json({
                    status: 'success',
                    data: {
                        user: user,
                    },
                });
            }
        }
    );
};

const updateUser = (req, res) => {
    let id = req.params.id;

    let user = users.find((ele) => ele._id === id);

    if (!user) {
        res.status(404).json({
            status: 'fail',
            message: `user with id ${id} not found`,
        });
    } else {
        let index = users.indexOf(user);
        Object.assign(user, req.body);
        users[index] = user;
        fs.writeFile(
            `${__dirname}/dev-data/data/users.json`,
            JSON.stringify(users, null, 4),
            (err) => {
                if (!err) {
                    res.status(200).json({
                        status: 'success',
                        data: {
                            user: user,
                        },
                    });
                }
            }
        );
    }
};

const deleteUser = (req, res) => {
    let id = req.params.id;

    let user = users.find((ele) => ele._id === id);

    if (!user) {
        res.status(404).json({
            status: 'fail',
            message: `user with id ${id} not found`,
        });
    } else {
        let index = users.indexOf(user);
        users.splice(index, 1);
        fs.writeFile(
            `${__dirname}/dev-data/data/users.json`,
            JSON.stringify(users, null, 4),
            (err) => {
                if (!err) {
                    res.status(204).json({
                        status: 'success',
                        results: users.length,
                        data: null,
                    });
                }
            }
        );
    }
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
