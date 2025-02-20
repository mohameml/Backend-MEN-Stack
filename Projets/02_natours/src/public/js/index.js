// /* eslint-disable */
// import '@babel/polyfill';
// import { displayMap } from './mapbox';
// import { login, logout } from './login';
// import { updateSettings } from './updateSettings';

// // DOM ELEMENTS
// const mapBox = document.getElementById('map');
// const loginForm = document.querySelector('.form--login');
// const logOutBtn = document.querySelector('.nav__el--logout');
// const userDataForm = document.querySelector('.form-user-data');
// const userPasswordForm = document.querySelector('.form-user-password');

// // DELEGATION
// if (mapBox) {
//   const locations = JSON.parse(mapBox.dataset.locations);
//   displayMap(locations);
// }

// if (loginForm)
//   loginForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     login(email, password);
//   });

// if (logOutBtn) logOutBtn.addEventListener('click', logout);

// if (userDataForm)
//   userDataForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     updateSettings({ name, email }, 'data');
//   });

// if (userPasswordForm)
//   userPasswordForm.addEventListener('submit', async e => {
//     e.preventDefault();
//     document.querySelector('.btn--save-password').textContent = 'Updating...';

//     const passwordCurrent = document.getElementById('password-current').value;
//     const password = document.getElementById('password').value;
//     const passwordConfirm = document.getElementById('password-confirm').value;
//     await updateSettings(
//       { passwordCurrent, password, passwordConfirm },
//       'password'
//     );

//     document.querySelector('.btn--save-password').textContent = 'Save password';
//     document.getElementById('password-current').value = '';
//     document.getElementById('password').value = '';
//     document.getElementById('password-confirm').value = '';
//   });

/* eslint-disable */

import { login, signup, logout } from './login'
import { displayMap } from './mapbox'


const mapbox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout')
const signupForm = document.querySelector('.form--signup')

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