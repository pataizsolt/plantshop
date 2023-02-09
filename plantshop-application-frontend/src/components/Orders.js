import { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import OrderItem from "./OrderItem";

const ORDER_URL = '/api/order';
const Orders = () => {


    const [orderData, setOrderData] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);

    const axiosPrivate = useAxiosPrivate();

    function refreshOrderData() {
        axiosPrivate.get(ORDER_URL + "/listorders",
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            setOrderData(resp.data);
            console.log(orderData);
            setIsFetching(false);


            if (resp.data.length > 0) {
                setIsEmpty(false);
            }
            else {
                setIsEmpty(true);
            }
        });
    }

    useEffect(() => {
        refreshOrderData();
    }, []);

    return (
        isEmpty ? (<div className="text-center text-xl my-40 font-semibold text-themetext3" > You don't have any orders yet.</div>) : (
            <>
                <div className="flex flex-col items-center justify-center">
                    <div className="py-2 inline-block">
                        <div className="overflow-hidden">

                            <div className="relative overflow-x-auto sm:rounded-lg max-w-7xl shadow-2xl">

                                <table className="text-sm mt-20 text-left text-themetext4 bg-themebackground4" >
                                    <caption className="p-5 text-lg font-semibold text-left text-themetext4 bg-themebackground4">
                                        List of orders
                                        <p className="mt-1 text-sm font-normal text-black">Here you can browse your previous and ongoing orders</p>
                                    </caption>
                                    <thead className="text-xs text-black uppercase bg-themebackground4 text-themetext4">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Address
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Phone number
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Paid
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Shipped
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Closed
                                            </th>
                                            <th scope="col" className="px-6 py-3">

                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {orderData.map((order) => (
                                            <>
                                                <OrderItem order={order} />

                                            </>
                                        ))}

                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </div>
                </div>
            </>
        )

    )
}

export default Orders
