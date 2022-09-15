import React from 'react'
import { useParams } from 'react-router-dom'
import Hero from '../components/hero/Hero'
import Featured from '../components/featured/Featured'
import Products from '../components/products/Products'

// eslint-disable-next-line react/function-component-definition
const HomePage = () => {
    const { keyword } = useParams()
    return (
        <>
            {keyword && <Products />}

            {!keyword && (
                <>
                    <Hero />
                    <Featured />
                    <Products />
                </>
            )}
        </>
    )
}

export default HomePage
