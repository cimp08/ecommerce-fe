/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './products.css'
import Card from '../card/Card'
import { listProducts } from '../../actions/productActions'

// eslint-disable-next-line react/function-component-definition
const Products = () => {
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    const [brand, setBrand] = useState('Apple')

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <section className="products__section">
            <div className="products__section-container">
                <div className="products__section-bar">
                    <ul className="products__section-brands">
                        <li>
                            <Link
                                to="/"
                                onClick={() => setBrand('Apple')}
                                className={brand === 'Apple' ? 'active' : 'brand-btn'}
                            >
                                Apple
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                onClick={() => setBrand('Samsung')}
                                className={brand === 'Samsung' ? 'active' : 'brand-btn'}
                            >
                                Samsung
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                onClick={() => setBrand('Sony')}
                                className={brand === 'Sony' ? 'active' : 'brand-btn'}
                            >
                                Sony
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                onClick={() => setBrand('Huawei')}
                                className={brand === 'Huawei' ? 'active' : 'brand-btn'}
                            >
                                Huwaei
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                onClick={() => setBrand('Xiaomi')}
                                className={brand === 'Xiaomi' ? 'active' : 'brand-btn'}
                            >
                                Xiaomi
                            </Link>
                        </li>
                    </ul>
                </div>
                <h3>{brand}</h3>
                {loading ? (
                    <h2>Loading...</h2>
                ) : error ? (
                    <h3>{error}</h3>
                ) : (
                    <div className="products__section-products">
                        {products
                            .filter((p) => p.brand === brand)
                            .map((product) => (
                                <Card key={product._id} product={product} />
                            ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Products
