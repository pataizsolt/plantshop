import React from 'react'
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const BASKET_URL = '/api/store/addtobasket';

const Product = ({ product }) => {

    const axiosPrivate = useAxiosPrivate();

    const handleClick = (id) => {
        console.log(id);
        // Update cart item quantity if already in cart
        axiosPrivate.post(BASKET_URL + "/" + id,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
        return;
    }





    return (
        <>
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
            </div>
            <div className='flex justify-between'>
                <div>
                    <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                </div>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block mt-4' onClick={() => handleClick(product.id)}>Add to basket</button>
            </div>

        </>
    )
}

export default Product
