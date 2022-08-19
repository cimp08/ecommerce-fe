/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form'
import { TbTruckDelivery } from 'react-icons/tb'
import { BsArrowLeft } from 'react-icons/bs'
import { listProductDetails } from '../../actions/productActions'
/* import Rating from '../rating/Rating' */
import Loader from '../loader/Loader'
import Message from '../message/Message'
import './productDetails.css'

// eslint-disable-next-line react/function-component-definition
const ProductDetails = () => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails
    // Get the id from the url
    const { id } = useParams()
    const navigate = useNavigate()
    /* const [showMore, setShowMore] = useState(false) */

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    return (
        <section className="product__section">
            <div className="product__container">
                <Link className="back" to="/">
                    <BsArrowLeft className="back-icon" />
                    Tillbaka
                </Link>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <>
                        <div className="product__item">
                            <div className="product__item-img">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="product__item-info">
                                <div className="price-rating">
                                    <p className="price">{product.price} kr</p>
                                    {/* <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} recensioner`}
                                    /> */}
                                </div>
                                <h3 className="name">Glasskydd 9HD- {product.name}</h3>
                                {product.countInStock > 0 && (
                                    <Form.Select
                                        size="lg"
                                        value={qty}
                                        onChange={(e) => setQty(e.target.value)}
                                    >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </Form.Select>
                                )}
                                <button
                                    className="btn"
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                >
                                    Köp
                                </button>
                                <div className="stock">
                                    <TbTruckDelivery className="stock-icon" />
                                    <p>
                                        {product.countInStock > 0
                                            ? 'Finns i lager !'
                                            : 'Slut i lager !'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="product__description">
                            <h3>Produktbeskrivning</h3>
                            <p>{product.description}</p>
                            {/* <p>
                                {showMore
                                    ? product.description
                                    : `${product.description.substring(0, 100)}`}
                            </p>
                            <button className="btn-read" onClick={() => setShowMore(!showMore)}>
                                {showMore ? 'Dölj' : 'Läs mer'}
                            </button> */}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default ProductDetails
