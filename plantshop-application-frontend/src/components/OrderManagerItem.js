import React, { useEffect } from 'react'
import { useState } from 'react';

const OrderManagerItem = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [paid, setPaid] = useState(props.order.paid);
    const [shipped, setShipped] = useState(props.order.shipped);
    const [closed, setClosed] = useState(props.order.closed);

    useEffect(() => {

    }, []);

    return (
        <>

            <tr className="bg-themebackground4">
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
                <td className="px-6 py-4" >
                    <button className="bg-transparent border-themebackground1 hover:bg-themebackground1 hover:text-themetext1 bg-themebackground3 border text-black text-black font-bold py-2 px-4 rounded-lg shadow-lg" onClick={() => {
                        props.handleClickPaid();
                        setPaid(!paid);
                    }
                    } >
                        {(paid.toString())}</button>
                </td>
                <td className="px-6 py-4" >
                    <button className="bg-transparent border-themebackground1 hover:bg-themebackground1 hover:text-themetext1 bg-themebackground3 border text-black text-black font-bold py-2 px-4 rounded-lg shadow-lg" onClick={() => {
                        props.handleClickShipped();
                        setShipped(!shipped);
                    }
                    } >
                        {(shipped.toString())}</button>
                </td>
                <td className="px-6 py-4" >
                    <button className="bg-transparent border-themebackground1 hover:bg-themebackground1 hover:text-themetext1 bg-themebackground3 border text-black text-black font-bold py-2 px-4 rounded-lg shadow-lg" onClick={() => {
                        props.handleClickClosed();
                        setClosed(!closed);
                    }
                    } >
                        {(closed.toString())}</button>
                </td>
                <td className="px-6 py-4">
                    <button className="bg-transparent border-themebackground1 hover:bg-themebackground1 hover:text-themetext1 bg-themebackground3 border text-black text-black font-bold py-2 px-4 rounded-lg shadow-lg" onClick={() => setIsOpen(!isOpen)}>
                        Show Products
                    </button>
                </td>
            </tr>
            <tr className='bg-themebackground4'>

                {isOpen && (

                    <table className="w-max" >
                        <caption className="p-5 text-m font-semibold text-left text-gray-900 bg-themebackground4">
                            Products
                        </caption>
                        <thead className='text-xs text-gray-700 uppercase bg-themebackground4 dark:text-black'>
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

export default OrderManagerItem