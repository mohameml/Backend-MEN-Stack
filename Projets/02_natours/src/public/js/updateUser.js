import axios from 'axios'
import { showAlert } from './alerts'

export const updateUserData = async (data) => {

    try {
        const res = await axios({
            method: 'PATCH',
            url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
            data

        });

        if (res.data.status === 'success') {
            showAlert('success', 'Your data has been updated successfully!');
            window.setTimeout(() => {
                location.reload(true);
            }, 1000);
        }

    } catch (e) {
        showAlert('error', e.response.data.message);
    }
}

export const updateUserPassword = async (passwordCurr, password, passwordConfirm) => {

    try {
        const res = await axios({
            method: 'PATCH',
            url: 'http://127.0.0.1:3000/api/v1/users/updateMyPassworde',
            data: {
                passwordCurrent: passwordCurr,
                password: password,
                passwordConfirm: passwordConfirm,
            }

        });

        if (res.data.status === 'success') {
            showAlert('success', 'Your password has been updated successfully!');
            window.setTimeout(() => {
                location.reload(true);
            }, 1000);
        }

    } catch (e) {
        showAlert('error', e.response.data.message);
    }
}