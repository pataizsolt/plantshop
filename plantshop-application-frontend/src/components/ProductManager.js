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

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productStock, setProductStock] = useState('');
    const [productCategoryName, setProductCategoryName] = useState('');
    const [productCategoryId, setProductCategoryId] = useState('');
    const [productSubCategoryName, setProductSubCategoryName] = useState('');
    const [productSubCategoryId, setProductSubCategoryId] = useState('');

    const [productData, setProductData] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    const axiosPrivate = useAxiosPrivate();

    function refreshProductData() {
        axiosPrivate.get(PRODUCT_URL + "/adminproducts",
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            setProductData(resp.data);
            console.log(productData);
            setIsFetching(false);
        });
    }

    function saveBranchCategory() {
        axiosPrivate.post(CATEGORY_URL + "/addBranchCategory",
            JSON.stringify({ id, productName }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).then(resp => {
            refreshProductData();
            console.log(resp);
        });
    }

    function handleClick(id) {
        axiosPrivate.delete(ORDER_URL + "/deletecategory?id=" + id,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            },
        ).then(resp => {
            console.log(resp);
            refreshProductData();
        });
    }


    useEffect(() => {

        console.log("asd")


        refreshProductData();


    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="py-2 inline-block">
                <div className="overflow-hidden">

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {isFetching ? (<div></div>) : (

                            <>
                                <table className="w-full text-sm text-left text-black " >
                                    <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-50">
                                        Products
                                        <p className="mt-1 text-sm font-normal text-black"></p>
                                    </caption>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-black">
                                        <tr>
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
                                                FILES
                                            </th>

                                            <th scope="col" className="px-6 py-3">
                                                <span className="sr-only">More info</span>
                                            </th>
                                            <th scope="col" className="px-6 py-3">

                                            </th>
                                            <th scope="col" className="px-6 py-3">

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productData.map((product) => (

                                            <AdminProduct key={product.id} product={product} handleClick={() => handleClick(product.id)} />

                                        ))}


                                        <tr className="border-b bg-gray-50">



                                            {clicked ?
                                                (
                                                    <>
                                                        <td className="px-6 py-4 text-right">
                                                            <div>
                                                                <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
                                                                <input type="text" id="small-input" className=""
                                                                    onChange={(e) => setProductName(e.target.value)} value={productName} />
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div>
                                                                <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
                                                                <input type="text" id="small-input" className=""
                                                                    onChange={(e) => setProductDescription(e.target.value)} value={productDescription} />
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div>
                                                                <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
                                                                <input type="text" id="small-input" className=""
                                                                    onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div>
                                                                <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
                                                                <input type="text" id="small-input" className=""
                                                                    onChange={(e) => setProductStock(e.target.value)} value={productStock} />
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button onClick={() => {
                                                                setClicked(prevClicked => !prevClicked);
                                                                saveBranchCategory();
                                                                setProductName('');
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