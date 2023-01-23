import React from 'react'
import { MdClose } from 'react-icons/md'
import { useState } from 'react';
import { axiosPrivate } from '../api/axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CATEGORY_URL = '/api/store';
const regex = /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/;

const BranchCategory = (props) => {
    const [branchCategoryName, setBranchCategoryName] = useState(props.category.branchCategoryName);
    const id = props.category.id;
    const [previousName, setPreviousName] = useState(branchCategoryName);
    const [clicked, setClicked] = useState(false);

    function saveBranchCategory() {
        if (regex.test(branchCategoryName)) {
            axiosPrivate.put(CATEGORY_URL + "/updatecategory",
                JSON.stringify({ id, branchCategoryName }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            ).then(resp => {
                toast.success("Saved branch category", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }).catch(error => {
                setBranchCategoryName(previousName);
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
            toast.error("Bad branch category format", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setBranchCategoryName(previousName);
        }




    }




    return (
        <tr className="bg-themebackground4">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {props.category.id}
            </th>
            {clicked ?
                (
                    <>
                        <td className="px-6 py-4 text-right">
                            <div className="relative rounded-md shadow-sm">
                                <input
                                    type="text"
                                    className="form-input py-2 px-4 block w-full leading-5 transition duration-150 ease-in-out  border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                    placeholder="Branch category name"
                                    onChange={(e) => setBranchCategoryName(e.target.value)}
                                    value={branchCategoryName}
                                />
                            </div>
                        </td>

                    </>
                )
                :
                (
                    <td className="px-6 py-4">
                        {branchCategoryName}
                    </td>
                )
            }



            <td className="px-6 py-4">
                <button onClick={props.handleClick} ><MdClose /></button>
            </td>


            {clicked ?


                (
                    <>

                        <td className="px-6 py-4">
                            <button className="bg-transparent border-themebackground1 hover:bg-themebackground1 hover:text-themetext1 bg-themebackground3 border text-black text-black font-bold py-2 px-4 rounded-lg shadow-lg" onClick={() => {
                                setClicked(prevClicked => !prevClicked);
                                saveBranchCategory();
                            }} >Save</button>
                        </td>
                        <td className="px-6 py-4">
                            <button className="bg-transparent border-themebackground1 hover:bg-themebackground1 hover:text-themetext1 bg-themebackground3 border text-black text-black font-bold py-2 px-4 rounded-lg shadow-lg" onClick={() => {
                                setClicked(prevClicked => !prevClicked);
                                setBranchCategoryName(previousName);
                            }} >Cancel</button>
                        </td>

                    </>
                )
                :
                (
                    <td className="px-6 py-4" colSpan="2">
                        <button className="bg-transparent border-themebackground1 hover:bg-themebackground1 hover:text-themetext1 bg-themebackground3 border text-black text-black font-bold py-2 px-4 rounded-lg shadow-lg" onClick={() => {
                            setClicked(prevClicked => !prevClicked);
                            setPreviousName(branchCategoryName);
                        }} >Edit</button>
                    </td>
                )

            }
            <td className="px-6 py-4 text-right">
                <Link to={'/admin/maincategorymanager/' + id}><button className="font-medium text-blue-600 dark:text-blue-500">...</button></Link>
            </td>




        </tr>
    )
}

export default BranchCategory