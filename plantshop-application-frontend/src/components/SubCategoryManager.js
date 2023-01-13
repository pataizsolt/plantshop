import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import { useState } from 'react';
import MainCategory from './MainCategory';
import { MdAdd } from 'react-icons/md';
import SubCategory from './SubCategory';

const CATEGORY_URL = '/api/store';
const SubCategoryManager = () => {
    let { id } = useParams();
    let parentId = id;


    const [isFetching, setIsFetching] = useState(true);
    const [subCategory, setSubCategory] = useState();
    const [clicked, setClicked] = useState(false);


    const [mainAndBranchCategoryData, setMainAndBranchCategoryData] = useState();


    const [subCategoryName, setSubCategoryName] = useState();




    function getSubCategory() {
        axiosPrivate.get(CATEGORY_URL + "/subcategories?id=" + parentId,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            getMainAndBranchCategoryData()
            setSubCategory(resp.data);

        });
    }


    function getMainAndBranchCategoryData() {
        axiosPrivate.get(CATEGORY_URL + "/branchandmaindata?id=" + parentId,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            console.log(resp);
            setMainAndBranchCategoryData(resp.data);
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

            getSubCategory();
        });
    }


    function saveSubCategory() {
        axiosPrivate.post(CATEGORY_URL + "/addSubCategory",
            JSON.stringify({ subCategoryName, parentId }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            getSubCategory();
            console.log(resp.data);
        });
    }






    useEffect(() => {
        getSubCategory();
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
                                        Sub categories of
                                        <br />
                                        Branch Category: {mainAndBranchCategoryData.branchCategoryName} - {mainAndBranchCategoryData.branchId}
                                        <br />
                                        Main Category: {mainAndBranchCategoryData.mainCategoryName} - {mainAndBranchCategoryData.mainId}
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
                                        {subCategory.map((category) => (

                                            <SubCategory key={category.id} category={category} handleClick={() => handleClick(category.id)} refresh={() => getSubCategory()} />

                                        ))}


                                        <tr className="border-b bg-gray-50">



                                            {clicked ?
                                                (
                                                    <>
                                                        <td className="px-6 py-4 text-right">
                                                            <div>
                                                                <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
                                                                <input type="text" id="small-input" className=""
                                                                    onChange={(e) => setSubCategoryName(e.target.value)} value={subCategoryName} />
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button onClick={() => {
                                                                setClicked(prevClicked => !prevClicked);
                                                                saveSubCategory();
                                                                setSubCategoryName('');
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