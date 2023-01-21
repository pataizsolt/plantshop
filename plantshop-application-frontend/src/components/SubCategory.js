import React from 'react'
import { useState } from 'react';
import { axiosPrivate } from '../api/axios';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';

const regex = /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/;
const CATEGORY_URL = '/api/store';
const SubCategory = (props) => {
    const [subCategoryName, setSubCategoryName] = useState(props.category.categoryName);
    const id = props.category.id;
    const [previousName, setPreviousName] = useState(subCategoryName);
    const [clicked, setClicked] = useState(false);

    function saveSubCategory() {
        if (regex.test(subCategoryName)) {
            axiosPrivate.put(CATEGORY_URL + "/updatesubcategory",
                JSON.stringify({ id, subCategoryName }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            ).then(resp => {
                console.log(resp);
                props.refresh();

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
                setSubCategoryName(previousName);
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
            setSubCategoryName(previousName);
        }
    }


    return (
        <tr className="border-b bg-gray-50">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {props.category.id}
            </th>
            {clicked ?
                (
                    <td className="px-6 py-4 text-right">
                        <div className="relative rounded-md shadow-sm">
                            <input
                                type="text"
                                className="form-input py-2 px-4 block w-full leading-5 transition duration-150 ease-in-out bg-white border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                placeholder="Branch category name"
                                onChange={(e) => setSubCategoryName(e.target.value)}
                                value={subCategoryName}
                            />
                        </div>
                    </td>
                )
                :
                (
                    <td className="px-6 py-4">
                        {subCategoryName}
                    </td>
                )
            }


            <td className="px-6 py-4">
                {props.category.href}
            </td>



            <td className="px-6 py-4">
                <button onClick={props.handleClick} ><MdClose /></button>
            </td>


            {clicked ?


                (
                    <>
                        <td className="px-6 py-4">
                            <button onClick={() => {
                                setClicked(prevClicked => !prevClicked);
                                saveSubCategory();
                            }} >Save</button>
                        </td>
                        <td className="px-6 py-4">
                            <button onClick={() => {
                                setClicked(prevClicked => !prevClicked);
                                setSubCategoryName(previousName);
                            }} >Cancel</button>
                        </td>
                    </>
                )
                :
                (
                    <>
                        <td className="px-6 py-4">
                            <button onClick={() => {
                                setClicked(prevClicked => !prevClicked);
                                setPreviousName(subCategoryName);
                            }} >Edit</button>
                        </td>
                        <td className="px-6 py-4">
                        </td>
                    </>
                )

            }





        </tr>
    )
}

export default SubCategory