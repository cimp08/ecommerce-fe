/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../card/Card'
import Loader from '../loader/Loader'
import Message from '../message/Message'
import { listTopProducts } from '../../actions/productActions'
import './featured.css'

// eslint-disable-next-line react/function-component-definition
const Featured = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector((state) => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (
        <section className="featured-section d-flex flex-column align-items-center">
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <h2>Populära Produkter</h2>
                    <div className="featured-section-cards d-flex justify-content-between gap-3">
                        {products.map((product) => (
                            <Card key={product._id} product={product} />
                        ))}
                    </div>
                </>
            )}
        </section>
    )
}

export default Featured
