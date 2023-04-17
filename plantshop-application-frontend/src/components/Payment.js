import React from "react";
import Stripe from "react-stripe-checkout";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Payment(props) {
    const axiosPrivate = useAxiosPrivate();

    async function handleToken(token) {
        console.log(token);
        await axiosPrivate.post("/api/payment/charge", "", {
            headers: {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
                token: token.id,
                amount: props.price
            },
        }).then(() => {
            alert("Payment Success");
            props.handlePayment()
        }).catch((error) => {
            alert(error);
        });
    }

    return (
        <div>
            <Stripe
                style={{
                    display: "none",
                }}
                stripeKey="pk_test_51MYuoVHgh0SCw99bDKVtEpzqealD6ttvUYLoXkxQZZH6bRaJXq4v9VncZ4oglDvPnbmuTxua26vW5azu4aJQWr2P007rwmCtrJ"
                token={handleToken}
            >
                <button disabled={props.disabled} className="mt-4 mb-8 w-full bg-transparent border-themebackground1 hover:bg-themebackground1 hover:text-themetext1 bg-themebackground3 border text-black text-black font-bold py-2 px-4 rounded-lg shadow-lg">Pay now</button>
            </Stripe>
        </div>
    );
}
export default Payment;