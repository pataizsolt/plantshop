import React from 'react'
import { useState } from 'react';
import { axiosPrivate } from '../api/axios';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

const CATEGORY_URL = '/api/store';
const MainCategory = (props) => {
    const [mainCategoryName, setMainCategoryName] = useState(props.category.categoryName);
    const id = props.category.id;
    const [previousName, setPreviousName] = useState(mainCategoryName);
    const [clicked, setClicked] = useState(false);

    function saveMainCategory() {
        axiosPrivate.put(CATEGORY_URL + "/updatemaincategory",
            JSON.stringify({ id, mainCategoryName }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            console.log(resp);
            props.refresh();

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
                                onChange={(e) => setMainCategoryName(e.target.value)} value={mainCategoryName} />
                        </div>
                    </td>
                )
                :
                (
                    <td className="px-6 py-4">
                        {mainCategoryName}
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
                                saveMainCategory();
                            }} >Save</button>
                        </td>
                        <td className="px-6 py-4">
                            <button onClick={() => {
                                setClicked(prevClicked => !prevClicked);
                                setMainCategoryName(previousName);
                            }} >Cancel</button>
                        </td>
                    </>
                )
                :
                (
                    <td className="px-6 py-4">
                        <button onClick={() => {
                            setClicked(prevClicked => !prevClicked);
                            setPreviousName(mainCategoryName);
                        }} >Edit</button>
                    </td>
                )

            }
            <td className="px-6 py-4 text-right">
                <Link to={'/admin/subcategorymanager/' + id}><button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">...</button></Link>
            </td>




        </tr>
    )
}

export default MainCategory