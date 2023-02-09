import React from 'react'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASKET_URL = '/api/store/addtobasket';

const Product = ({ product }) => {


    const [isFetching, setIsFetching] = useState(true);
    const [link, setLink] = useState("");
    let first_result = "";

    const axiosPrivate = useAxiosPrivate();

    const handleClick = (id) => {

        // Update cart item quantity if already in cart
        axiosPrivate.post(BASKET_URL + "/" + id,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            toast.success("Product added to the basket!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
        return;
    }

    useEffect(() => {
        setLink("");
        if (product.files.length > 0) {
            if (product.files !== undefined) {
                setLink(product.files[0].url);
            }
        }
        setIsFetching(false);
    })






    return (

        <>
            {isFetching ? (<div></div>) : (
                <div>
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                        <img
                            src={link}
                            alt={product.imageAlt}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                    </div>
                    <div className='flex justify-between p-2'>
                        <div>
                            <h3 className="text-lg text-themetext3">{product.name}</h3>
                            <p className=" text-lg font-medium text-themetext3">{product.price} $</p>
                        </div>
                        <button className="my-auto bg-transparent border-themebackground2 hover:bg-themebackground1 hover:text-themetext1 bg-themebackground2 text-themetext2 border text-black text-black py-2 px-4 rounded-lg shadow-lg" onClick={() => handleClick(product.id)}>Add to basket</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Product
