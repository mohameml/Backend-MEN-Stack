const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');


const router = express.Router();



// ========================== auth ==========================

router.post('/signup', authController.signup)

router.post('/login', authController.login)

router.get('/logout', authController.logout)

router.post('/forgotPassword', authController.forgotPassword)

router.patch('/resetPassword/:token', authController.resetPassword)

router.patch('/updateMyPassworde', authController.protect, authController.updatePassword)



// ====================== user login ===========================

router.use(authController.protect);


router.get('/me',
    userController.setUserIdInParams,
    userController.getMe
);

router.patch('/updateMe', userController.updateMe);

router.delete('/deleteMe', userController.deleteMe);



// ========================= admin ========================


router.use(authController.restrictiTo("admin"));

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)


router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);


module.exports = router;
