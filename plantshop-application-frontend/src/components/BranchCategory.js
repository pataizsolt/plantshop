import React from 'react'
import { MdClose } from 'react-icons/md'
import { useState } from 'react';
import { axiosPrivate } from '../api/axios';

const CATEGORY_URL = '/api/store';
const BranchCategory = (props) => {
    const [branchCategoryName, setBranchCategoryName] = useState(props.category.branchCategoryName);
    const id = props.category.id;
    const [previousName, setPreviousName] = useState(branchCategoryName);
    const [clicked, setClicked] = useState(false);

    function saveBranchCategory() {
        axiosPrivate.put(CATEGORY_URL + "/updatecategory",
            JSON.stringify({ id, branchCategoryName }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            console.log(resp);


        });
    }


    return (
        <tr className="border-b bg-gray-50">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {props.category.id}
            </th>
            {clicked ?
                (
                    <td className="px-6 py-4 text-right">
                        <div>
                            <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
                            <input type="text" id="small-input" className=""
                                onChange={(e) => setBranchCategoryName(e.target.value)} value={branchCategoryName} />
                        </div>
                    </td>
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
                            <button onClick={() => {
                                setClicked(prevClicked => !prevClicked);
                                saveBranchCategory();
                            }} >Save</button>
                        </td>
                        <td className="px-6 py-4">
                            <button onClick={() => {
                                setClicked(prevClicked => !prevClicked);
                                setBranchCategoryName(previousName);
                            }} >Cancel</button>
                        </td>
                    </>
                )
                :
                (
                    <td className="px-6 py-4">
                        <button onClick={() => {
                            setClicked(prevClicked => !prevClicked);
                            setPreviousName(branchCategoryName);
                        }} >Edit</button>
                    </td>
                )

            }
            <td className="px-6 py-4 text-right">
                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">...</button>
            </td>




        </tr>
    )
}

export default BranchCategory