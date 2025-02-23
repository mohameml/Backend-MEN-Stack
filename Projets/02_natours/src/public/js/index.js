/* eslint-disable */

import { showAlert } from './alerts';
import { login, signup, logout, forgetPassword } from './auth'
import { displayMap } from './mapbox'
import { updateUserData, updateUserPassword } from './updateUser'
import { bookTour } from './stripe'

const mapbox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout')
const signupForm = document.querySelector('.form--signup')
const updateUserDataForm = document.querySelector('.form-user-data');
const updateUserPasswordForm = document.querySelector('.form-user-password');
const btnForgetPassword = document.querySelector('.btn-forget');
const btnBookingTour = document.getElementById('booking-tour');

// ================= display Map in /tour :  ===================
if (mapbox) {

    const locations = JSON.parse(mapbox.dataset.locations);
    displayMap(locations);

}

// ================ for /signup : User ===================
if (signupForm) {

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;

        signup(name, email, password, passwordConfirm);

    })
}



// ================ for /login User : =====================
if (loginForm) {

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);

    });
}

// ================ logout user : ===================
if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}

// ================ Update User Data : ====================

if (updateUserDataForm) {
    updateUserDataForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const photo = document.getElementById('photo').files[0];

        const form = new FormData();

        form.append('name', name);
        form.append('email', email);
        form.append('photo', photo);


        updateUserData(form);

    })
}

// ================= Update User password ================

if (updateUserPasswordForm) {
    updateUserPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const passwordCurr = document.getElementById('password-current').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        await updateUserPassword(passwordCurr, password, passwordConfirm);
    })
}

// ============= Reset Password =============

if (btnForgetPassword) {

    btnForgetPassword.addEventListener('click', e => {

        const email = document.getElementById('email').value;

        if (!email) {
            showAlert('error', 'Please Provide an email');
        } else {

            forgetPassword(email);
        }


    })
}

// ================ Booking Tour ==================
if (btnBookingTour) {
    const tourId = btnBookingTour.dataset.tourid;
    btnBookingTour.addEventListener('click', e => {
        e.target.textContent = 'Processing ...';
        bookTour(tourId);
        e.target.textContent = 'Book tour now!';

    })
}