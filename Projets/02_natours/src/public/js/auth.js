/* eslint-disable */
import axios from 'axios'
import { showAlert } from './alerts';


export const signup = async (name, email, password, passwordConfirm) => {


    try {

        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/signup',
            data: {
                name,
                email,
                password,
                passwordConfirm
            }
        });


        if (res.data.status === 'success') {

            showAlert('success', "Your count is created successfully!");

            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }

    } catch (e) {
        showAlert('error', e.response.data.message);
    }

}



export const login = async (email, password) => {

    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/login',
            data: {
                email,
                password
            }
        });


        if (res.data.status === 'success') {

            showAlert('success', "Logged in successfully !");

            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }

    } catch (e) {
        showAlert('error', e.response.data.message);
    }

}



export const logout = async () => {


    try {

        const res = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/api/v1/users/logout',
        });

        if (res.data.status === 'success') {
            showAlert('success', "Logged out successfully !");

            window.setTimeout(() => {
                location.assign('/login');

            }, 1000)
            // location.reload(true);
        }

    } catch (e) {
        showAlert('error', 'Error logging out! Try again.');
    }
}


export const forgetPassword = async (email) => {

    try {

        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/forgotPassword',
            data: {
                email,
            }
        });


        if (res.data.status === 'success') {

            showAlert('success', "An Email is send in to your account for reset password");
        }

    } catch (e) {
        showAlert('error', e.response.data.message);
    }
}