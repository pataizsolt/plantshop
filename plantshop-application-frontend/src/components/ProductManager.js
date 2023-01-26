import React from 'react'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { MdClose, MdAdd } from 'react-icons/md';
import AdminProduct from './AdminProduct';
import { ToastContainer, toast } from 'react-toastify';

const regex = /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/;
const regexnumber = /^\d+$/;
const ORDER_URL = '/api/store';
const PRODUCT_URL = '/api/store';
const CATEGORY_URL = '/api/store';
const ProductManager = () => {
    const { auth } = useAuth();

    let id = null;

    const [clicked, setClicked] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');

    const [productData, setProductData] = useState('');
    const [categoryData, setCategoryData] = useState('');
    const [subCategoryData, setSubCategoryData] = useState('');
    const [isFetchingProduct, setIsFetchingProduct] = useState(true);
    const [isFetchingCategory, setIsFetchingCategory] = useState(true);
    const [isFetching, setIsFetching] = useState(true);
    const axiosPrivate = useAxiosPrivate();






    function saveProduct() {
        if (regex.test(name) && regex.test(description) && regexnumber.test(price) && regexnumber.test(stock) && regexnumber.test(categoryId) && regexnumber.test(subCategoryId)) {
            axiosPrivate.post(PRODUCT_URL + "/addproduct",
                JSON.stringify({ name, description, price, stock, categoryId, subCategoryId }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            ).then(resp => {
                refreshProductData();

            }).catch(error => {

                toast.error("Product saving error", {
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
            toast.error("Bad product format", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        setName('');
        setDescription('');
        setPrice('');
        setStock('');
        setCategoryId('');
        setSubCategoryId('');
    }

    function handleClick(id) {
        axiosPrivate.post(ORDER_URL + "/changeproductavailability?id=" + id,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            },
        ).then(resp => {

            refreshProductData();
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
        <div className="flex flex-col items-center justify-center ">
            <div className="my-20 inline-block md:max-w-7xl">
                <div className="overflow-hidden">

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {isFetchingProduct ? (<div></div>) : (

                            <>
                                <table className="w-full text-sm text-left text-black " >
                                    <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-themebackground4">
                                        Products
                                        <p className="mt-1 text-sm font-normal text-black"></p>
                                    </caption>
                                    <thead className="text-xs text-gray-700 uppercase bg-themebackground4 dark:text-black">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                PICTURE
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                ID
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                NAME
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                DESCRIPTION
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                PRICE
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                STOCK
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                CATEGORY NAME - ID
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                SUBCATEGORY NAME - ID
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                AVAILABLE
                                            </th>
                                            <th scope="col" className="py-3 pr-3" colSpan={3}>
                                                OPERATIONS
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productData.map((product) => (

                                            <AdminProduct key={product.id} product={product} handleClick={() => handleClick(product.id)} refresh={() => refreshProductData()} />

                                        ))}


                                        <tr className="bg-themebackground4">



                                            {clicked ?
                                                (
                                                    <>
                                                        <td className="px-6 py-4 text-right" colSpan={2}></td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="relative rounded-md shadow-sm">
                                                                <input
                                                                    type="text"
                                                                    className="form-input py-2 px-4 block w-full leading-5 transition duration-150 ease-in-out  border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
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
                                                                    className="form-input py-2 px-4 block w-full leading-5 transition duration-150 ease-in-out  border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                                                    placeholder="Description"
                                                                    onChange={(e) => setDescription(e.target.value)}
                                                                    value={description}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="relative rounded-md shadow-sm">
                                                                <input
                                                                    type="number"
                                                                    className="form-input py-2 px-4 block w-full leading-5 transition duration-150 ease-in-out  border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                                                    placeholder="Price"
                                                                    onChange={(e) => setPrice(e.target.value)}
                                                                    value={price}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="relative rounded-md shadow-sm">
                                                                <input
                                                                    type="number"
                                                                    className="form-input py-2 px-4 block w-full leading-5 transition duration-150 ease-in-out  border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                                                    placeholder="Stock"
                                                                    onChange={(e) => setStock(e.target.value)}
                                                                    value={stock}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div class="relative rounded-md shadow-sm">
                                                                <select onChange={(e) => {
                                                                    setCategoryId(e.target.value);
                                                                    refreshSubCategories(e.target.value);
                                                                }}
                                                                    value={categoryId}

                                                                    class="form-select py-2 px-4 block w-full leading-5 transition duration-150 ease-in-out  border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5" aria-label="Default select example">
                                                                    <option selected >Select a main category</option>

                                                                    {isFetchingCategory ? (<div></div>) : (
                                                                        categoryData.categoryList.map((category) => (

                                                                            <option key={category.id} value={category.id} >{category.categoryName} - {category.id}</option>

                                                                        ))
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div class="relative rounded-md shadow-sm">
                                                                <select class="form-select py-2 px-4 block w-full leading-5 transition duration-150 ease-in-out  border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5" aria-label="Default select example"
                                                                    onChange={(e) => {
                                                                        setSubCategoryId(e.target.value);
                                                                    }}
                                                                    value={subCategoryId}>
                                                                    <option selected >Select a sub category</option>
                                                                    {isFetching ? (<div></div>) : (
                                                                        subCategoryData.map((category) => (
                                                                            <option key={category.id} value={category.id}>{category.categoryName} - {category.id}</option>
                                                                        ))
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">

                                                        </td>


                                                        <td className="px-6 py-4">
                                                            <button className="bg-transparent border-themebackground1 hover:bg-themebackground1 hover:text-themetext1 bg-themebackground3 border text-black text-black font-bold py-2 px-4 rounded-lg shadow-lg" onClick={() => {
                                                                setClicked(prevClicked => !prevClicked);
                                                                saveProduct();
                                                                setName('');
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
                                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" colSpan="11">
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

export default ProductManager