import { useEffect } from "react"
import axios from "../api/axios"
import Product from "./Product"
import { useState } from "react"
import { useParams } from "react-router-dom"



export default function Products() {
    const [productData, setProductData] = useState([]);
    let { category } = useParams();



    useEffect(() => {

        console.log(category);

        if (category === undefined) {
            axios.get('/api/store/products').then(resp => {
                console.log(resp.data);
                setProductData(resp.data);
            });
        }
        else {
            axios.get('/api/store/products/' + category).then(resp => {
                console.log(resp.data);
                setProductData(resp.data);
            });
        }


    }, [])

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {productData.map((product) => (
                        <a as="Link" key={product.id} to="#" className="group">
                            <Product product={product} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}