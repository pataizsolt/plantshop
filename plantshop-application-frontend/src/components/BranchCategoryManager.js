import React from 'react'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { MdClose, MdAdd } from 'react-icons/md';
import BranchCategory from './BranchCategory';
import { data } from 'autoprefixer';

const ORDER_URL = '/api/store';
const CATEGORY_URL = '/api/store';
const BranchCategoryManager = () => {
    const { auth } = useAuth();

    let id = null;
    const [branchCategoryName, setBranchCategoryName] = useState('');
    const [clicked, setClicked] = useState(false);



    const [categoryData, setCategoryData] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    const axiosPrivate = useAxiosPrivate();

    function refreshBranchCategoryData() {
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

    function saveBranchCategory() {
        axiosPrivate.post(CATEGORY_URL + "/addBranchCategory",
            JSON.stringify({ id, branchCategoryName }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            refreshBranchCategoryData();
            console.log(resp);
        });
    }

    function handleClick(id) {
        axiosPrivate.delete(ORDER_URL + "/deletecategory?id=" + id,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            },
        ).then(resp => {
            console.log(resp);
            refreshBranchCategoryData();
        });
    }


    useEffect(() => {

        console.log("asd")

        console.log(categoryData);
        refreshBranchCategoryData();


    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="py-2 inline-block">
                <div className="overflow-hidden">

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {isFetching ? (<div></div>) : (

                            <>
                                <table className="w-full text-sm text-left text-black " >
                                    <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-50">
                                        Branch Categories
                                        <p className="mt-1 text-sm font-normal text-black"></p>
                                    </caption>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-black">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                ID
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                NAME
                                            </th>

                                            <th scope="col" className="px-6 py-3">
                                                <span className="sr-only">More info</span>
                                            </th>
                                            <th scope="col" className="px-6 py-3">

                                            </th>
                                            <th scope="col" className="px-6 py-3">

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categoryData.categories.map((category) => (

                                            <BranchCategory key={category.id} category={category} handleClick={() => handleClick(category.id)} />

                                        ))}


                                        <tr className="border-b bg-gray-50">



                                            {clicked ?
                                                (
                                                    <>
                                                        <td className="px-6 py-4 text-right">
                                                            <div>
                                                                <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
                                                                <input type="text" id="small-input" className=""
                                                                    onChange={(e) => setBranchCategoryName(e.target.value)} value={branchCategoryName} />
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button onClick={() => {
                                                                setClicked(prevClicked => !prevClicked);
                                                                saveBranchCategory();
                                                                setBranchCategoryName('');
                                                            }} >Save</button>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button onClick={() => {
                                                                setClicked(prevClicked => !prevClicked);

                                                            }} >Cancel</button>

                                                        </td>
                                                    </>
                                                )
                                                :
                                                (
                                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" colSpan="5">
                                                        <button className=' block mx-auto' onClick={() => {
                                                            setClicked(prevClicked => !prevClicked);

                                                        }}><MdAdd /></button>
                                                    </td>
                                                )
                                            }







                                        </tr>
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