import React from 'react'
import Hero from '../components/hero/Hero'
import Featured from '../components/featured/Featured'
import Products from '../components/products/Products'

// eslint-disable-next-line react/function-component-definition
const HomePage = () => {
    return (
        <>
            <Hero />
            <Featured />
            <Products />
        </>
    )
}

export default HomePage
