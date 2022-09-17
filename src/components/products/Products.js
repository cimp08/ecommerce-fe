/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import './products.css'
import Card from '../card/Card'
import Message from '../message/Message'
import Loader from '../loader/Loader'
import Paginate from '../paginate/Paginate'
import { listProducts } from '../../actions/productActions'

// eslint-disable-next-line react/function-component-definition
const Products = () => {
    const dispatch = useDispatch()
    const { keyword } = useParams()
    const { pageNumber } = useParams() || 1

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList

    const [brand, setBrand] = useState('Apple')

    useEffect(() => {
        if (keyword) {
            dispatch(listProducts('', keyword, pageNumber))
        } else {
            dispatch(listProducts(brand, keyword, pageNumber))
        }
    }, [dispatch, brand, keyword, pageNumber])

    return (
        <section className="products-section">
            <div className="products-section-container">
                {!keyword && (
                    <div className="products-section-bar">
                        <ul className="products-section-brands d-flex justify-content-between flex-wrap">
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
                )}
                {!keyword ? (
                    <h2 className="text-center">{brand}</h2>
                ) : (
                    <>
                        <Link to="/">Tillbaka</Link>
                        <h3>Sökresultat för: {keyword}</h3>
                    </>
                )}
                {!loading && products.length === 0 && (
                    <h4 className="text-center">Artikel saknas ...</h4>
                )}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <>
                        <div className="products-section-products">
                            {products.map((product) => (
                                <Card key={product._id} product={product} />
                            ))}
                        </div>
                        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                    </>
                )}
            </div>
        </section>
    )
}

export default Products
