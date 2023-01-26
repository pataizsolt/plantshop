import React from 'react'
import NumericInput from 'react-numeric-input'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
const BASKET_URL = '/api/store';
const BasketProduct = (props) => {


    const axiosPrivate = useAxiosPrivate();

    const [quantity, setQuantity] = useState(props.product.quantity);
    const [productId, setProductId] = useState(props.product.id);
    const [subtotal, setSubtotal] = useState(props.product.price * props.product.quantity);

    const updateSubtotal = () => {
        setSubtotal(props.product.price * quantity);
    }

    function updateQuantity() {
        axiosPrivate.post(BASKET_URL + "/changeproductquantity",
            JSON.stringify({ productId, quantity }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            console.log(resp);
            updateSubtotal();

        });
    }

    useEffect(() => {
        console.log(quantity)
        updateQuantity();
    });



    return (

        <>


            <div className="ml-4 flex flex-1 flex-col bg-themebackground3 p-5 rounded-md">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900 mb-5">
                        <h3>
                            <p>{props.product.name}</p>
                        </h3>
                        <p className="ml-4">{subtotal}</p>
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">


                    <NumericInput
                        name="Quantity"
                        className="form-control"
                        min={1}
                        max={props.product.stock}
                        step={1}
                        precision={0}
                        size={5}
                        mobile
                        inputmode="numeric"
                        strict
                        value={quantity}
                        onChange={value =>
                            setQuantity(value)
                        }
                    />

                    <div className="flex">
                        <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={props.handleClick}

                        >
                            Remove
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default BasketProduct