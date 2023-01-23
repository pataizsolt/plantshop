import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import { useState } from 'react';
import MainCategory from './MainCategory';
import { MdAdd } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';

const regex = /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/;
const CATEGORY_URL = '/api/store';


const MainCategoryManager = () => {
    let { id } = useParams();

    const [isFetching, setIsFetching] = useState(true);
    const [branchCategory, setBranchCategory] = useState('');
    const [clicked, setClicked] = useState(false);


    const [mainCategoryName, setMainCategoryName] = useState('');

    const [errMsg, setErrMsg] = useState('');




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
        if (regex.test(mainCategoryName)) {
            axiosPrivate.post(CATEGORY_URL + "/addMainCategory",
                JSON.stringify({ id, mainCategoryName }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            ).then(resp => {
                getBranchCategory();
                console.log(resp.data);
            }).catch(error => {

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
            toast.error("Bad main category format", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }


    useEffect(() => {

        getBranchCategory();
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
                                        Main categories of {branchCategory.categoryName} - {branchCategory.id}
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
                                            <th scope="col" className="px-6 py-3" colSpan={3}>

                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {branchCategory.mainCategories.map((category) => (

                                            <MainCategory key={category.id} category={category} handleClick={() => handleClick(category.id)} refresh={() => getBranchCategory()} />

                                        ))}


                                        <tr className="bg-themebackground4">



                                            {clicked ?
                                                (
                                                    <>
                                                        <td></td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="relative rounded-md shadow-sm">
                                                                <input
                                                                    type="text"
                                                                    className="form-input py-2 px-4 block w-full leading-5 transition duration-150 ease-in-out  border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                                                    placeholder="Branch category name"
                                                                    onChange={(e) => setMainCategoryName(e.target.value)}
                                                                    value={mainCategoryName}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td></td>
                                                        <td></td>

                                                        <td className="px-6 py-4">
                                                            <button className="bg-transparent border-themebackground1 hover:bg-themebackground1 hover:text-themetext1 bg-themebackground3 border text-black text-black font-bold py-2 px-4 rounded-lg shadow-lg" onClick={() => {
                                                                setClicked(prevClicked => !prevClicked);
                                                                saveMainCategory();
                                                                setMainCategoryName('');
                                                            }} >Save</button>
                                                        </td>
                                                        <td className="px-6 py-4" colSpan={2}>
                                                            <button className="bg-transparent border-themebackground1 hover:bg-themebackground1 hover:text-themetext1 bg-themebackground3 border text-black text-black font-bold py-2 px-4 rounded-lg shadow-lg" onClick={() => {
                                                                setClicked(prevClicked => !prevClicked);

                                                            }} >Cancel</button>

                                                        </td>
                                                    </>
                                                )
                                                :
                                                (
                                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" colSpan="7">
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

export default MainCategoryManager