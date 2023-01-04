import React, { useEffect, useState } from 'react'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import NumericInput from 'react-numeric-input';
import BasketProduct from './BasketProduct';


const BASKET_URL = '/api/store';
const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
]

const ShoppingBasket = () => {
    const [basketData, setBasketData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    let i = 0;

    function refreshBasketData() {
        axiosPrivate.get(BASKET_URL + "/getbasket",
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            setBasketData(resp.data);
            setIsFetching(false);
        });
    }

    function handleClick(id) {
        axiosPrivate.post(BASKET_URL + "/deleteItem/" + id,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }).then(resp => {
                console.log(resp.data);
                refreshBasketData();
            });
    }

    useEffect(() => {

        console.log("asd")
        refreshBasketData();
        console.log(basketData);


    }, []);








    return (
        <>

            {isFetching ? (<div></div>) : (
                <div className="flex h-full max-w-7xl mx-auto flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="mt-8">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {basketData.products.map((product) => (
                                        <li key={product.id} className="flex py-6">
                                            <BasketProduct product={product} handleClick={() => handleClick(product.id)} refresh={() => refreshBasketData()} />
                                            {/*<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                                                        strict
                                                    />

                                                    <div className="flex">
                                                        <button
                                                            key={i++}
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            onClick={() => handleClick(product.id)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                    </div>*/}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">

                        <div className="mt-6">
                            <a
                                href="#"
                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                Checkout
                            </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or
                                <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

            )}
        </>
    )
}

export default ShoppingBasket
