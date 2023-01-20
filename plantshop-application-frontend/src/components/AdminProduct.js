import React from 'react'
import { useState } from 'react';
import { axiosPrivate } from '../api/axios';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { useEffect } from 'react';

const PRODUCT_URL = '/api/store';
const ADD_FILE_URL = '/api/files/add_image_to_product/';
const AdminProduct = (props) => {

    const productId = props.product.id;
    const id = props.product.id;



    const [name, setName] = useState(props.product.name);
    const [description, setDescription] = useState(props.product.description);
    const [price, setPrice] = useState(props.product.price);
    const [stock, setStock] = useState(props.product.stock);
    const [categoryName, setCategoryName] = useState(props.product.categoryName);
    const [categoryId, setCategoryId] = useState(props.product.categoryId);
    const [subcategoryName, setSubcategoryName] = useState(props.product.subcategoryName);
    const [subcategoryId, setSubcategoryId] = useState(props.product.subcategoryId);
    const [available, setAvailable] = useState(props.product.available);
    const [file, setFile] = useState();

    const [previousName, setPreviousName] = useState(name);
    const [previousDescription, setPreviousDescription] = useState(description);
    const [previousPrice, setPreviousPrice] = useState(price);
    const [previousStock, setPreviousStock] = useState(stock);
    const [previousCategoryName, setPreviousCategoryName] = useState(categoryName);
    const [previousCategoryId, setPreviousCategoryId] = useState(categoryId);
    const [previousSubCategoryName, setPreviousSubCategoryName] = useState(subcategoryName);
    const [previousSubcategoryId, setPreviousSubcategoryId] = useState(subcategoryId);


    const [isFetchingProduct, setIsFetchingProduct] = useState(true);
    const [isFetchingCategory, setIsFetchingCategory] = useState(true);
    const [isFetching, setIsFetching] = useState(true);


    const [productData, setProductData] = useState('');
    const [categoryData, setCategoryData] = useState('');
    const [subCategoryData, setSubCategoryData] = useState('');


    const [clicked, setClicked] = useState(false);

    const changeHandler = (event) => {
        setFile(event.target.files[0]);
    };

    function uploadFile() {


        let formData = new FormData();

        formData.append('file', file);


        axiosPrivate.post(ADD_FILE_URL + productId,
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            }
        ).then(resp => {
            props.refresh();

        });
    }


    function updateProduct() {




        axiosPrivate.put(PRODUCT_URL + "/updateproduct",
            JSON.stringify({ id, name, description, price, stock, categoryId, subcategoryId }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {

            props.refresh();
        });
    }

    function refreshProductData() {
        axiosPrivate.get(PRODUCT_URL + "/adminproducts",
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            setProductData(resp.data);
            console.log(available);
            setIsFetchingProduct(false);
        });
    }

    function getCategories() {
        axiosPrivate.get(PRODUCT_URL + "/categoryDTO",
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            setCategoryData(resp.data);

            setIsFetchingCategory(false);
        });
    }

    function refreshSubCategories(mainCategoryId) {
        let result = categoryData.subCategoryList.filter(function (el) {
            return parseInt(el.parentId) === parseInt(mainCategoryId);
        })
        setSubcategoryId('');
        setSubcategoryName('');
        setSubCategoryData(result);
        setIsFetching(false);
    }

    useEffect(() => {



        if (isFetchingCategory) {
            getCategories();


        }
        if (isFetchingProduct) {
            refreshProductData();
        }










    }, []);


    return (
        <tr className="border-b bg-gray-50">
            <th scope="row" className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">

                <img
                    src={props.product.files[0] ? props.product.files[0].url : ""}
                    className="h-full w-full object-cover object-center"
                />
            </th>
            <td className="px-6 py-4 text-right">
                {props.product.id}
            </td>
            {clicked ?
                (
                    <>
                        <td className="px-6 py-4 text-right">
                            <div className="relative rounded-md shadow-sm">
                                <input
                                    type="text"
                                    className="form-input py-2 px-4 block w-full leading-5 transition duration-150 ease-in-out bg-white border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div className="relative rounded-md shadow-sm">
                                <input
                                    type="text"
                                    className="form-input py-2 px-4 block w-full leading-5 transition duration-150 ease-in-out bg-white border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                    placeholder="Description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                />
                            </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div className="relative rounded-md shadow-sm">
                                <input
                                    type="text"
                                    className="form-input py-2 px-4 block w-full leading-5 transition duration-150 ease-in-out bg-white border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                    placeholder="Price"
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                />
                            </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div className="relative rounded-md shadow-sm">
                                <input
                                    type="text"
                                    className="form-input py-2 px-4 block w-full leading-5 transition duration-150 ease-in-out bg-white border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                    placeholder="Price"
                                    onChange={(e) => setStock(e.target.value)}
                                    value={stock}
                                />
                            </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div class="flex justify-center">
                                <div class="mb-3 xl:w-96">
                                    <select onChange={(e) => {
                                        setCategoryId(e.target.value);
                                        refreshSubCategories(e.target.value);
                                    }}
                                        value={categoryId}

                                        class="form-select py-2 px-4 block w-full leading-5 transition duration-150 ease-in-out bg-white border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">


                                        {isFetchingCategory ? (<div></div>) : (
                                            <>
                                                <option selected value={categoryData.categoryList[0].id} >{categoryData.categoryList[0].categoryName} - {categoryData.categoryList[0].id}</option>

                                                {isFetchingCategory ? (<div></div>) : (
                                                    categoryData.categoryList.slice(1).map((category) => (

                                                        <option key={category.id} value={category.id} >{category.categoryName} - {category.id}</option>

                                                    ))
                                                )}

                                            </>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div class="flex justify-center">
                                <div class="mb-3 xl:w-96">
                                    <select class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
                                        onChange={(e) => {
                                            setSubcategoryId(e.target.value);

                                        }}
                                        value={subcategoryId}>

                                        {isFetching ? (<div></div>) : (
                                            <>

                                                <option selected >Select a sub category</option>
                                                {isFetching ? (<div></div>) : (
                                                    subCategoryData.map((category) => (

                                                        <option key={category.id} value={category.id}>{category.categoryName} - {category.id}</option>

                                                    ))
                                                )}
                                            </>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div class="flex justify-center">
                                <div class="mb-3 xl:w-96">
                                    <div className="form-group files color">
                                        <label>Upload Your File </label>
                                        <input type="file" className="form-control" name="file" onChange={changeHandler} />
                                    </div>
                                </div>
                            </div>
                        </td>


                    </>
                )
                :
                (
                    <>
                        <td className="px-6 py-4">
                            {name}
                        </td>
                        <td className="px-6 py-4">
                            {description}
                        </td>
                        <td className="px-6 py-4">
                            {price}
                        </td>
                        <td className="px-6 py-4">
                            {stock}
                        </td>
                        <td className="px-6 py-4">
                            {categoryName} - {categoryId}
                        </td>
                        <td className="px-6 py-4">
                            {subcategoryName} - {subcategoryId}
                        </td>
                        <td className="">

                        </td>
                    </>
                )
            }

            <td className="h-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <button onClick={() => {
                    props.handleClick();
                    setAvailable(!available);
                }
                } >
                    {(available.toString())}</button>
            </td>

            {clicked ?


                (
                    <>
                        <td className="px-6 py-4">
                            <button onClick={() => {
                                setClicked(prevClicked => !prevClicked);
                                uploadFile();
                                updateProduct();
                            }} >Save</button>
                        </td>
                        <td className="px-6 py-4">
                            <button onClick={() => {
                                setClicked(prevClicked => !prevClicked);
                                setName(previousName);
                                setDescription(previousDescription);
                                setPrice(previousPrice);
                                setStock(previousStock);
                                setCategoryId(previousCategoryId);
                                setCategoryName(previousCategoryName);
                                setSubcategoryName(previousSubCategoryName);
                                setSubcategoryId(previousCategoryId);
                            }} >Cancel</button>
                        </td>
                    </>
                )
                :
                (
                    <td className="px-6 py-4">
                        <button onClick={() => {
                            setClicked(prevClicked => !prevClicked);
                            setPreviousName(name);
                            setPreviousDescription(description);
                            setPreviousPrice(price);
                            setPreviousStock(stock);
                            setPreviousCategoryName(categoryName);
                            setPreviousCategoryId(categoryId);
                            setPreviousSubCategoryName(subcategoryName);
                            setPreviousSubcategoryId(subcategoryId);
                        }} >Edit</button>
                    </td>
                )

            }
        </tr>
    )
}

export default AdminProduct