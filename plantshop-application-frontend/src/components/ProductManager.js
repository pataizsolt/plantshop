import React from 'react'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { MdClose, MdAdd } from 'react-icons/md';
import AdminProduct from './AdminProduct';

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
        axiosPrivate.post(PRODUCT_URL + "/addproduct",
            JSON.stringify({ name, description, price, stock, categoryId, subCategoryId }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            refreshProductData();

        });
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
        setSubCategoryId('');
        setSubCategoryName('');
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
        <div className="flex flex-col items-center justify-center">
            <div className="py-2 inline-block">
                <div className="overflow-hidden">

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {isFetchingProduct ? (<div></div>) : (

                            <>
                                <table className="w-full text-sm text-left text-black " >
                                    <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-50">
                                        Products
                                        <p className="mt-1 text-sm font-normal text-black"></p>
                                    </caption>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-black">
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
                                                <span className="sr-only">More info</span>
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productData.map((product) => (

                                            <AdminProduct key={product.id} product={product} handleClick={() => handleClick(product.id)} refresh={() => refreshProductData()} />

                                        ))}


                                        <tr className="border-b bg-gray-50">



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
                                                                        <option selected >Select a main category</option>

                                                                        {isFetchingCategory ? (<div></div>) : (
                                                                            categoryData.categoryList.map((category) => (

                                                                                <option key={category.id} value={category.id} >{category.categoryName} - {category.id}</option>

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
                                                            </div>
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <button onClick={() => {
                                                                setClicked(prevClicked => !prevClicked);
                                                                saveProduct();
                                                                setName('');
                                                            }} >Save</button>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button onClick={() => {
                                                                setClicked(prevClicked => !prevClicked);

                                                            }} >Cancel</button>

                                                        </td>
                                                    </>
                                                )
                                                :
                                                (
                                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" colSpan="5">
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