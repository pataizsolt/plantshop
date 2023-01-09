import React from 'react'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { MdClose } from 'react-icons/md';
import BranchCategory from './BranchCategory';

const ORDER_URL = '/api/store';
const BranchCategoryManager = () => {
    const { auth } = useAuth();



    const [categoryData, setCategoryData] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    const axiosPrivate = useAxiosPrivate();

    function refreshOrderData() {
        axiosPrivate.get(ORDER_URL + "/categories",
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            setCategoryData(resp.data);
            setIsFetching(false);
        });
    }

    function handleClick(id) {
        axiosPrivate.delete(ORDER_URL + "/deletecategory",
            JSON.stringify({ id }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            console.log(resp);
        });
    }

    useEffect(() => {

        console.log("asd")
        refreshOrderData();
        console.log(categoryData);


    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="py-2 inline-block">
                <div className="overflow-hidden">

                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {isFetching ? (<div></div>) : (

                            <>
                                <table class="w-full text-sm text-left text-black " >
                                    <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-50">
                                        Branch Categories
                                        <p class="mt-1 text-sm font-normal text-black"></p>
                                    </caption>
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:text-black">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                ID
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                NAME
                                            </th>

                                            <th scope="col" class="px-6 py-3">
                                                <span class="sr-only">More info</span>
                                            </th>
                                            <th scope="col" class="px-6 py-3">

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categoryData.categories.map((category) => (

                                            <BranchCategory key={category.id} category={category} handleClick={() => handleClick(category.id)} />

                                        ))}

                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BranchCategoryManager