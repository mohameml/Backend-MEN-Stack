/* eslint-disable */


import axios from "axios"
import { showAlert } from "./alerts"


export const bookTour = async (tourId) => {

    const stripe = Stripe('pk_test_51QvIlTK79QlzAjfPUJvPxwTCB70m8PvDFV5u5Uc7xD9oepeSqvDIkt2uibBggtJvqi7K7c1UYqnWeuPx3ufwAm8400XBtQkZ7k')

    // 1) Get the session from the server : 

    const url = `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`;

    try {

        const res = await axios({
            method: 'GET',
            url
        })

        // let session;

        // if (res.data.status === 'success') {
        //     session = res.data.session;
        // }

        // if (!session) {
        //     showAlert('error', 'Something wront very wrong try again !');
        // }

        // console.log(session);

        // 2) Create checkout form +  charge  credit carde : 

        await stripe.redirectToCheckout({
            sessionId: res.data.session.id
        });


    } catch (e) {

        showAlert('error', e.response.data.message);
    }


}