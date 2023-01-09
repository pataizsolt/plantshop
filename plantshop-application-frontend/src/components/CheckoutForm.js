import React, { useEffect, useState } from 'react'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import OrderSummaryProduct from './OrderSummaryProduct';




const BASKET_URL = '/api/store';
const ORDER_URL = '/api/order';
const CheckoutForm = () => {
    const [name, setName] = useState('Asd Asd');
    const [email, setEmail] = useState('asd@asd.com');
    const [phoneNumber, setPhoneNumber] = useState('+36303334444');
    const [city, setCity] = useState('randomcity');
    const [street, setStreet] = useState('random st');
    const [houseNumber, setHouseNumber] = useState('32');
    const [zipcode, setZipcode] = useState('3200');




    const [isFetching, setIsFetching] = useState(true);
    const [basketData, setBasketData] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    let i = 0;

    const handleSubmit = async (e) => {
        e.preventDefault();


        const response = await axiosPrivate.post(ORDER_URL + "/createorder",
            JSON.stringify({ name, email, phoneNumber, city, street, houseNumber, zipcode }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        console.log(JSON.stringify(response?.data));

        refreshBasketData();
    }


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



    useEffect(() => {

        console.log("asd")
        refreshBasketData();
        console.log(basketData);


    }, []);

    return (
        <>

            <div className="flex flex-col items-center justify-center">
                <div className="py-2 inline-block">
                    <div className="overflow-hidden">
                        <div className="grid lg:grid-cols-2 sm:px-10 lg:px-20 xl:px-32 ">
                            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                <div className="mt-10 px-4 pt-8 lg:mt-0">
                                    <p className="text-xl font-medium">Payment Details</p>
                                    <p className="text-gray-400">Complete your order by providing your payment details.</p>
                                    <div className="">
                                        <label for="name" className="mt-4 mb-2 block text-sm font-medium">Name</label>
                                        <div className="relative">
                                            <input type="text" id="name" name="name" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your Name" onChange={(e) => setName(e.target.value)}
                                                value={name} />
                                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <label for="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
                                        <div className="relative">
                                            <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" onChange={(e) => setEmail(e.target.value)}
                                                value={email} />
                                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                </svg>
                                            </div>
                                        </div>
                                        <label for="phone" className="mt-4 mb-2 block text-sm font-medium">Phone number</label>
                                        <div className="relative">
                                            <input type="text" id="phone" name="phone" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="+36xxxxxxxxx" onChange={(e) => setPhoneNumber(e.target.value)}
                                                value={phoneNumber} />
                                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 20 20" stroke="currentColor" stroke-width="1">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.372,1.781H6.628c-0.696,0-1.265,0.569-1.265,1.265v13.91c0,0.695,0.569,1.265,1.265,1.265h6.744c0.695,0,1.265-0.569,1.265-1.265V3.045C14.637,2.35,14.067,1.781,13.372,1.781 M13.794,16.955c0,0.228-0.194,0.421-0.422,0.421H6.628c-0.228,0-0.421-0.193-0.421-0.421v-0.843h7.587V16.955z M13.794,15.269H6.207V4.731h7.587V15.269z M13.794,3.888H6.207V3.045c0-0.228,0.194-0.421,0.421-0.421h6.744c0.228,0,0.422,0.194,0.422,0.421V3.888z" />
                                                </svg>
                                            </div>
                                        </div>


                                        <label for="billing-address" className="mt-4 mb-2 block text-sm font-medium">Address</label>
                                        <div className="flex">
                                            <div className="relative w-4/12 flex-shrink-0">
                                                <input type="text" id="city" name="city" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="City" onChange={(e) => setCity(e.target.value)}
                                                    value={city} />
                                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 20 20" stroke="currentColor" stroke-width="1">
                                                        <path d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <input type="text" name="street" className="w-4/12 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street" onChange={(e) => setStreet(e.target.value)} value={street} />
                                            <input type="text" name="housenumber" className="w-2/12 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="House number" onChange={(e) => setHouseNumber(e.target.value)} value={houseNumber} />
                                            <input type="text" name="zip" className="w-2/12 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" onChange={(e) => setZipcode(e.target.value)} value={zipcode} />
                                        </div>

                                        <div className="mt-6 border-t border-b py-2">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                                                <p className="font-semibold text-gray-900">${basketData.price}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p classNameName="text-sm font-medium text-gray-900">Shipping</p>
                                                <p className="font-semibold text-gray-900">$10</p>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-900">Total</p>
                                            <p className="text-2xl font-semibold text-gray-900">${basketData.price + 10.00}</p>
                                        </div>
                                    </div>
                                    <button type="submit" className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
                                </div>
                            </form>
                            <div className="px-4 pt-8">
                                <p className="text-xl font-medium">Order Summary</p>
                                <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
                                {isFetching ? (<div></div>) : (
                                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                            {basketData.products.map((product) => (
                                                <li key={product.id} className="flex py-6">
                                                    <OrderSummaryProduct product={product} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutForm