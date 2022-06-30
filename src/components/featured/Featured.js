/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../card/Card'
import './featured.css'

// eslint-disable-next-line react/function-component-definition
const Featured = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products')
            setProducts(data)
        }
        fetchProducts()
    }, [])

    return (
        <section className="featured__section">
            <h3>populära produkter</h3>
            <div className="featured__section-cards">
                {products.map((product) => (
                    <Card key={product._id} product={product} />
                ))}
            </div>
        </section>
    )
}

export default Featured
