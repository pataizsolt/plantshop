import React from 'react'
import { useState } from 'react';

const OrderItem = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>

            <tr className="bg-gray-50">
                <th className="px-6 py-4">
                    {props.order.name}
                </th>
                <td className="px-6 py-4">
                    {props.order.email}
                </td>
                <td className="px-6 py-4">
                    {props.order.address}
                </td>
                <td className="px-6 py-4">
                    {props.order.phoneNumber}
                </td>
                <td className="px-6 py-4">
                    {props.order.date}
                </td>
                <td className="px-6 py-4">
                    {props.order.paid}
                </td>
                <td className="px-6 py-4">
                    {props.order.shipped}
                </td>
                <td className="px-6 py-4">
                    {props.order.closed}
                </td>
                <td className="px-6 py-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" onClick={() => setIsOpen(!isOpen)}>
                        Show Products
                    </button>
                </td>
            </tr>
            <tr className='bg-gray-50'>

                {isOpen && (

                    <table className="w-max" >
                        <caption className="p-5 text-m font-semibold text-left text-gray-900 bg-gray-50">
                            Products
                        </caption>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:text-black'>
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Quantity</th>

                            </tr>
                        </thead>
                        <tbody>
                            {props.order.products.map(product => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4">{product.name}</td>
                                    <td className="px-6 py-4">{product.price}</td>
                                    <td className="px-6 py-4">{product.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                )}

            </tr>

        </>
    )
}

export default OrderItem