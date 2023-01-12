import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import { useState } from 'react';
import MainCategory from './MainCategory';
import { MdAdd } from 'react-icons/md';

const CATEGORY_URL = '/api/store';
const SubCategoryManager = () => {
    let { id } = useParams();

    const [isFetching, setIsFetching] = useState(true);
    const [branchCategory, setBranchCategory] = useState();
    const [clicked, setClicked] = useState(false);


    const [mainCategoryName, setMainCategoryName] = useState();




    function getBranchCategory() {
        axiosPrivate.get(CATEGORY_URL + "/branchcategory?id=" + id,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            setBranchCategory(resp.data);
            setIsFetching(false);
        });
    }


    function handleClick(id) {
        console.log(id);
    }


    function handleClick(id) {
        axiosPrivate.delete(CATEGORY_URL + "/deletemaincategory?id=" + id,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            },
        ).then(resp => {
            console.log(resp);
            getBranchCategory();
        });
    }


    function saveMainCategory() {
        axiosPrivate.post(CATEGORY_URL + "/addMainCategory",
            JSON.stringify({ id, mainCategoryName }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            getBranchCategory();
            console.log(resp.data);
        });
    }


    useEffect(() => {

        getBranchCategory();
    }, [])

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="py-2 inline-block">
                <div className="overflow-hidden">

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {isFetching ? (<div></div>) : (

                            <>
                                <table className="w-full text-sm text-left text-black " >
                                    <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-50">
                                        Main categories of {branchCategory.categoryName} - {branchCategory.id}
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
                                                HREF
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
                                        {branchCategory.mainCategories.map((category) => (

                                            <MainCategory key={category.id} category={category} handleClick={() => handleClick(category.id)} refresh={() => getBranchCategory()} />

                                        ))}


                                        <tr className="border-b bg-gray-50">



                                            {clicked ?
                                                (
                                                    <>
                                                        <td className="px-6 py-4 text-right">
                                                            <div>
                                                                <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
                                                                <input type="text" id="small-input" className=""
                                                                    onChange={(e) => setMainCategoryName(e.target.value)} value={mainCategoryName} />
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button onClick={() => {
                                                                setClicked(prevClicked => !prevClicked);
                                                                saveMainCategory();
                                                                setMainCategoryName('');
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

export default SubCategoryManager