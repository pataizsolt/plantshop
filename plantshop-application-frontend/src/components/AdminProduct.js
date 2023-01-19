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
            console.log(resp.data);

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
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {props.product.id}
            </th>
            {clicked ?
                (
                    <>
                        <td className="px-6 py-4 text-right">
                            <div>
                                <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
                                <input type="text" id="small-input" className=""
                                    onChange={(e) => setName(e.target.value)} value={name} />
                            </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div>
                                <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
                                <input type="text" id="small-input" className=""
                                    onChange={(e) => setDescription(e.target.value)} value={description} />
                            </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div>
                                <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
                                <input type="text" id="small-input" className=""
                                    onChange={(e) => setPrice(e.target.value)} value={price} />
                            </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div>
                                <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
                                <input type="text" id="small-input" className=""
                                    onChange={(e) => setStock(e.target.value)} value={stock} />
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

                                        class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                        <option selected value={props.product.categoryId}>{props.product.categoryName} - {props.product.categoryId}</option>

                                        {isFetchingCategory ? (<div></div>) : (
                                            categoryData.categoryList.map((category) => (

                                                <option selected key={category.id} value={category.id} >{category.categoryName} - {category.id}</option>

                                            ))
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
                                        <option selected value={props.product.subcategoryId}>{props.product.subcategoryName} - {props.product.subcategoryId}</option>
                                        {isFetching ? (<div></div>) : (
                                            subCategoryData.map((category) => (

                                                <option selected key={category.id} value={category.id}>{category.categoryName} - {category.id}</option>

                                            ))
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
                                uploadFile();
                                updateProduct();
                            }} >Save</button>
                        </td>
                        <td className="px-6 py-4">
                            <button onClick={() => {
                                setClicked(prevClicked => !prevClicked);
                                setName(previousName);
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
                        }} >Edit</button>
                    </td>
                )

            }
        </tr>
    )
}

export default AdminProduct