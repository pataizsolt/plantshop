import React from 'react'
import { useState } from 'react';
import { axiosPrivate } from '../api/axios';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';


const CATEGORY_URL = '/api/store';
const AdminProduct = (props) => {

    const id = props.product.id;
    const [productName, setProductName] = useState(props.product.name);
    const [previousName, setPreviousName] = useState(productName);

    const [productDescription, setProductDescription] = useState(props.product.description);
    const [previousProductDescription, setPreviousProductDescription] = useState(productDescription);

    const [productPrice, setProductPrice] = useState(props.product.price);
    const [previousProductPrice, setPreviousProductPrice] = useState(productPrice);

    const [productStock, setProductStock] = useState(props.product.stock);
    const [previousProductStock, setPreviousProductStock] = useState(productStock);

    const [productCategoryName, setProductCategoryName] = useState(props.product.categoryName);
    const [previousProductCategoryName, setPreviousProductCategoryName] = useState(productCategoryName);

    const [productCategoryId, setProductCategoryId] = useState(props.product.categoryId);
    const [previousProductCategoryId, setPreviousProductCategoryId] = useState(productCategoryId);

    const [productSubCategoryName, setProductSubCategoryName] = useState(props.product.subcategoryName);
    const [previousProductSubCategoryName, setPreviousProductSubCategoryName] = useState(productSubCategoryName);

    const [productSubCategoryId, setProductSubCategoryId] = useState(props.product.subcategoryId);
    const [previousProductSubCategoryId, setPreviousProductSubCategoryId] = useState(productSubCategoryId);



    const [clicked, setClicked] = useState(false);

    function saveSubCategory() {
        axiosPrivate.put(CATEGORY_URL + "/updatesubcategory",
            JSON.stringify({ id, productName }),
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
                {props.product.id}
            </th>
            {clicked ?
                (
                    <td className="px-6 py-4 text-right">
                        <div>
                            <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
                            <input type="text" id="small-input" className=""
                                onChange={(e) => setProductName(e.target.value)} value={productName} />
                        </div>
                    </td>
                )
                :
                (
                    <>
                        <td className="px-6 py-4">
                            {productName}
                        </td>
                        <td className="px-6 py-4">
                            {productDescription}
                        </td>
                        <td className="px-6 py-4">
                            {productPrice}
                        </td>
                        <td className="px-6 py-4">
                            {productStock}
                        </td>
                        <td className="px-6 py-4">
                            {productCategoryName} - {productCategoryId}
                        </td>
                        <td className="px-6 py-4">
                            {productSubCategoryName} - {productSubCategoryId}
                        </td>
                    </>
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
                                saveSubCategory();
                            }} >Save</button>
                        </td>
                        <td className="px-6 py-4">
                            <button onClick={() => {
                                setClicked(prevClicked => !prevClicked);
                                setProductName(previousName);
                            }} >Cancel</button>
                        </td>
                    </>
                )
                :
                (
                    <td className="px-6 py-4">
                        <button onClick={() => {
                            setClicked(prevClicked => !prevClicked);
                            setPreviousName(productName);
                        }} >Edit</button>
                    </td>
                )

            }
        </tr>
    )
}

export default AdminProduct