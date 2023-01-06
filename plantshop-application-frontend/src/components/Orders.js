import { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const ORDER_URL = '/api/order';
const Orders = () => {


    const [orderData, setOrderData] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    const axiosPrivate = useAxiosPrivate();

    function refreshOrderData() {
        axiosPrivate.get(ORDER_URL + "/listorders",
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            setOrderData(resp.data);
            setIsFetching(false);
        });
    }

    useEffect(() => {

        console.log("asd")
        refreshOrderData();
        console.log(orderData);


    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="py-2 inline-block">
                <div className="overflow-hidden">

                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {isFetching ? (<div></div>) : (
                            <table class="w-full text-sm text-left text-black " >
                                <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-50">
                                    List of orders
                                    <p class="mt-1 text-sm font-normal text-black">Here you can browse your previous and ongoing orders</p>
                                </caption>
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:text-black">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Address
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Phone number
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Date
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Paid
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Closed
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <span class="sr-only">More info</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderData.map((order) => (
                                        <tr class="border-b bg-gray-50">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {order.name}
                                            </th>
                                            <td class="px-6 py-4">
                                                {order.email}
                                            </td>
                                            <td class="px-6 py-4">
                                                {order.address}
                                            </td>
                                            <td class="px-6 py-4">
                                                {order.phoneNumber}
                                            </td>
                                            <td class="px-6 py-4">
                                                {order.date}
                                            </td>
                                            <td class="px-6 py-4">
                                                {order.paid}
                                            </td>
                                            <td class="px-6 py-4">
                                                {order.closed}
                                            </td>
                                            <td class="px-6 py-4 text-right">
                                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">...</a>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Orders
