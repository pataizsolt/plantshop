import React from 'react'
import { useEffect } from 'react'
import useAuth from '../hooks/useAuth'


const CategoryManager = () => {
    const { auth } = useAuth();


    useEffect(() => {
        console.log(auth?.roles[0].authority);
    })

    return (
        <div>CategoryManager</div>
    )
}

export default CategoryManager