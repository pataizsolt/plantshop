import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import { useState } from 'react';
import MainCategory from './MainCategory';
import { MdAdd } from 'react-icons/md';
import SubCategory from './SubCategory';
import { ToastContainer, toast } from 'react-toastify';

const regex = /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/;
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


        if (regex.test(subCategoryName)) {
            axiosPrivate.post(CATEGORY_URL + "/addSubCategory",
                JSON.stringify({ subCategoryName, parentId }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            ).then(resp => {
                getSubCategory();
                console.log(resp.data);
            }).catch(error => {
                setSubCategoryName('');
                toast.error("Choose different names for every branch category", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        }
        else {
            toast.error("Bad subcategory format", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setSubCategoryName('');
        }
    }






    useEffect(() => {
        getSubCategory();
    }, [])

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="my-20 inline-block">
                <div className="overflow-hidden">

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {isFetching ? (<div></div>) : (

                            <>
                                <table className="w-full text-sm text-left text-black " >
                                    <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-themebackground4">
                                        Sub categories of
                                        <br />
                                        Branch Category: {mainAndBranchCategoryData.branchCategoryName} - {mainAndBranchCategoryData.branchId}
                                        <br />
                                        Main Category: {mainAndBranchCategoryData.mainCategoryName} - {mainAndBranchCategoryData.mainId}
                                        <p className="mt-1 text-sm font-normal text-black"></p>
                                    </caption>
                                    <thead className="text-xs text-gray-700 uppercase bg-themebackground4 dark:text-black">
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


                                        <tr className="bg-themebackground4">



                                            {clicked ?
                                                (
                                                    <>
                                                        <td className="px-6 py-4 text-right"></td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="relative rounded-md shadow-sm">
                                                                <input
                                                                    type="text"
                                                                    className="form-input py-2 px-4 block w-full leading-5 transition duration-150 ease-in-out  border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                                                    placeholder="Branch category name"
                                                                    onChange={(e) => setSubCategoryName(e.target.value)}
                                                                    value={subCategoryName}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right" colSpan={2}></td>
                                                        <td className="px-6 py-4">
                                                            <button className="bg-transparent border-themebackground1 hover:bg-themebackground1 hover:text-themetext1 bg-themebackground3 border text-black text-black font-bold py-2 px-4 rounded-lg shadow-lg" onClick={() => {
                                                                setClicked(prevClicked => !prevClicked);
                                                                saveSubCategory();
                                                                setSubCategoryName('');
                                                            }} >Save</button>
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <button className="bg-transparent border-themebackground1 hover:bg-themebackground1 hover:text-themetext1 bg-themebackground3 border text-black text-black font-bold py-2 px-4 rounded-lg shadow-lg" onClick={() => {
                                                                setClicked(prevClicked => !prevClicked);

                                                            }} >Cancel</button>

                                                        </td>
                                                    </>
                                                )
                                                :
                                                (
                                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" colSpan="6">
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