import React from 'react'
import NumericInput from 'react-numeric-input'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
const BASKET_URL = '/api/store';
const OrderSummaryProduct = (props) => {


    const axiosPrivate = useAxiosPrivate();

    const [quantity, setQuantity] = useState(props.product.quantity);
    const [productId, setProductId] = useState(props.product.id);
    const [subtotal, setSubtotal] = useState(props.product.price * props.product.quantity)


    function updateQuantity() {
        axiosPrivate.post(BASKET_URL + "/changeproductquantity",
            JSON.stringify({ productId, quantity }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            console.log(resp);
        });
    }

    useEffect(() => {
        console.log(props.product.stock)
        updateQuantity();
        setSubtotal(props.product.price * props.product.quantity);


    });



    return (

        <>


            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">

                        <p>{props.product.name}</p>

                        <p className="ml-4">{subtotal}</p>
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">




                    <p>Quantity: {props.product.quantity}</p>

                </div>
            </div>
        </>
    )
}

export default OrderSummaryProduct