import React, { useEffect, useState } from 'react'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import NumericInput from 'react-numeric-input';
import BasketProduct from './BasketProduct';
import { Link } from 'react-router-dom';


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
    const [isEmpty, setIsEmpty] = useState(true);
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
            if (resp.data.products.length > 0) {
                setIsEmpty(false);
            }
            else {
                setIsEmpty(true);
            }

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
        refreshBasketData();
        console.log(basketData);
        console.log(basketData.length === 0)
    }, []);

    return (
        <>

            {isEmpty ? (<div className="text-center text-xl my-40 font-semibold text-themetext3" > Your cart is empty.</div>) : (
                <>

                    <div className="flex h-full max-w-3xl w-full mx-auto flex-col shadow-xl my-40 bg-themebackground4 rounded-md">
                        <caption className="p-5 text-lg font-semibold text-left text-themetext4 bg-themebackground4 rounded-md">
                            Your basket:
                            <p className="mt-1 text-sm font-normal text-themetext4"></p>
                        </caption>
                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                            <div className="">
                                <div className="flow-root">
                                    <ul role="list" className="">
                                        {basketData.products.map((product) => (
                                            <li key={product.id} className="flex py-3">
                                                <BasketProduct product={product} handleClick={() => handleClick(product.id)} refresh={() => refreshBasketData()} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="border-gray-200 py-6 px-4 sm:px-6">

                            <div className="mt-3 w-fit mx-auto">
                                <Link
                                    to="/checkout"
                                    className="bg-transparent border-themebackground1 hover:bg-themebackground1 hover:text-themetext1 bg-themebackground3 border text-black text-black font-bold py-2 px-4 rounded-lg shadow-lg"
                                >
                                    Checkout
                                </Link>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    <p>or</p>
                                    <Link to="/store">
                                        <button
                                            type="button"
                                            className="font-medium text-themetext4 hover:black"
                                        >
                                            Continue Shopping
                                        </button>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                </>
            )}
        </>
    )
}

export default ShoppingBasket
