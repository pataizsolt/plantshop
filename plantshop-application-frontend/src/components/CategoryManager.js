import React from 'react'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const ORDER_URL = '/api/store';
const CategoryManager = () => {
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categoryData.categories.map((category) => (
                                            <tr class="border-b bg-gray-50">
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {category.id}
                                                </th>
                                                <td class="px-6 py-4">
                                                    {category.branchCategoryName}
                                                </td>
                                                <td class="px-6 py-4 text-right">
                                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">...</a>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>


                                <table class="w-full text-sm text-left text-black " >
                                    <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-50">
                                        Main categories
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
                                                BRANCH CATEGORY - ID
                                            </th>

                                            <th scope="col" class="px-6 py-3">
                                                <span class="sr-only">More info</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categoryData.categories.map((category) => (
                                            <>

                                                {category.categoryContainers.map((element) => (
                                                    <tr class="border-b bg-gray-50">

                                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                            {element.mainCategory.id}
                                                        </th>
                                                        <td class="px-6 py-4">
                                                            {element.mainCategory.categoryName}
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            {category.branchCategoryName} - {category.id}
                                                        </td>
                                                        <td class="px-6 py-4 text-right">
                                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">...</a>
                                                        </td>

                                                    </tr>
                                                ))}




                                            </>
                                        ))}

                                    </tbody>
                                </table>

                                <table class="w-full text-sm text-left text-black " >
                                    <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-50">
                                        Subcategories
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
                                                BRANCH CATEGORY - ID
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                MAIN CATEGORY - ID
                                            </th>

                                            <th scope="col" class="px-6 py-3">
                                                <span class="sr-only">More info</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categoryData.categories.map((category) => (
                                            <>

                                                {category.categoryContainers.map((element) => (
                                                    <>

                                                        {element.subCategories.map((subcategory) => (
                                                            <tr class="border-b bg-gray-50">

                                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                                    {subcategory.id}

                                                                </th>
                                                                <td class="px-6 py-4">
                                                                    {subcategory.categoryName}
                                                                </td>
                                                                <td class="px-6 py-4">
                                                                    {category.branchCategoryName} - {category.id}
                                                                </td>
                                                                <td class="px-6 py-4">
                                                                    {element.mainCategory.categoryName} - {element.mainCategory.id}
                                                                </td>
                                                                <td class="px-6 py-4 text-right">
                                                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">...</a>
                                                                </td>

                                                            </tr>
                                                        ))}
                                                    </>

                                                ))}
                                            </>
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

export default CategoryManager