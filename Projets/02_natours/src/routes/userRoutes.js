const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController')

const router = express.Router();



router.post('/signup', authController.signup)

router.post('/login', authController.login)

router.post('/forgotPassword', authController.forgotPassword)

router.patch('/resetPassword/:token', authController.resetPassword)

router.patch('/updateMyPassworde', authController.protect, authController.updatePassword)




router
    .route('/')
    .get(userController.getAllUsers)
// .post(userController.createUser);


router.patch('/updateMe', authController.protect, userController.updateMe);

router.delete('/deleteMe', authController.protect, userController.deleteMe);


// router
//     .route('/:id')
//     .get(userController.getUser)
//     .patch(userController.updateUser)
//     .delete(authController.protect, authController.restrictiTo("admin"), userController.deleteUser);


module.exports = router;
