/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './products.css'
import axios from 'axios'
import Card from '../card/Card'

// eslint-disable-next-line react/function-component-definition
const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products')
            setProducts(data)
        }
        fetchProducts()
    }, [])

    return (
        <section className="products__section">
            <div className="products__section-container">
                <div className="products__section-bar">
                    <ul className="products__section-brands">
                        <li>
                            <Link to="/">Apple</Link>
                        </li>
                        <li>
                            <Link to="/">Samsung</Link>
                        </li>
                        <li>
                            <Link to="/">Sony</Link>
                        </li>
                        <li>
                            <Link to="/">Huwaei</Link>
                        </li>
                        <li>
                            <Link to="/">Xiaomi</Link>
                        </li>
                    </ul>
                </div>
                <h3>Apple</h3>

                <div className="products__section-products">
                    {products.map((product) => (
                        <Card key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Products
