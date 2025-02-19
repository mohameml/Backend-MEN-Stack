// /* eslint-disable */
// import axios from 'axios';
// import { showAlert } from './alerts';

// export const login = async (email, password) => {
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: 'http://127.0.0.1:3000/api/v1/users/login',
//       data: {
//         email,
//         password
//       }
//     });

//     if (res.data.status === 'success') {
//       showAlert('success', 'Logged in successfully!');
//       window.setTimeout(() => {
//         location.assign('/');
//       }, 1500);
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };

// export const logout = async () => {
//   try {
//     const res = await axios({
//       method: 'GET',
//       url: 'http://127.0.0.1:3000/api/v1/users/logout'
//     });
//     if ((res.data.status = 'success')) location.reload(true);
//   } catch (err) {
//     console.log(err.response);
//     showAlert('error', 'Error logging out! Try again.');
//   }
// };


// for SUMBIT  : 




const login = async (email, password) => {


    try {

        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/login',
            data: {
                email,
                password
            }
        }
        );


        if (res.data.status === 'success') {

            alert("Logged in successfully !");

            window.setTimeout(() => {
                location.assign('/')
            }, 1000);
        }

    } catch (e) {
        alert(e.response.data.message);
        console.log(e.response.data.message);
    }


}

document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
})