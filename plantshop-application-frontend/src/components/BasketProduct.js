import React from 'react'
import NumericInput from 'react-numeric-input'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
const BASKET_URL = '/api/store';
const BasketProduct = ({ product, handleClick }) => {


    const axiosPrivate = useAxiosPrivate();








    return (

        <>
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <a href={product.name}>{product.name}</a>
                        </h3>
                        <p className="ml-4">{product.price}</p>
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">


                    <NumericInput
                        name="Quantity"
                        className="form-control"
                        value={product.quantity}
                        min={0}
                        max={10}
                        step={1}
                        precision={0}
                        size={5}
                        mobile
                        inputmode="numeric"
                    />

                    <div className="flex">
                        <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={event => handleClick(event, product.id)}

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