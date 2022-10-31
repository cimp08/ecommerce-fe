/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, ListGroup } from 'react-bootstrap'
import { TbTruckDelivery } from 'react-icons/tb'
import { BsArrowLeft } from 'react-icons/bs'
import { listProductDetails, createProductReview } from '../../actions/productActions'
import Rating from '../rating/Rating'
import Loader from '../loader/Loader'
import Message from '../message/Message'
import Meta from '../meta/Meta'
import './productDetails.css'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constans/productConstans'

// eslint-disable-next-line react/function-component-definition
const ProductDetails = () => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [showMore, setShowMore] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = productReviewCreate

    // Get the id from the url
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
        }
        if (!product._id || product._id !== id) {
            dispatch(listProductDetails(id))
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
    }, [dispatch, id, product._id, successProductReview])

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            createProductReview(id, {
                rating,
                comment,
            })
        )
    }

    return (
        <section className="product-section">
            <div className="product-container">
                <Link className="link-black" to="/">
                    <BsArrowLeft className="icon-back" />
                    Tillbaka
                </Link>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <>
                        <Meta title={product.name} />
                        <div className="product-item d-flex flex-wrap gap-5 mt-5">
                            <div className="product-item-img d-flex align-items-center justify-content-center bg-white">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="product-item-info">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="price">{product.price} kr</p>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} recensioner`}
                                    />
                                </div>
                                <h3 className="name">Glasskydd- {product.name}</h3>
                                {product.countInStock > 0 && (
                                    <Form.Select
                                        className="stock-option"
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
                                    className="btn-black mt-4 w-100"
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                >
                                    Lägg i varukorgen
                                </button>
                                <div className="stock d-flex align-items-center gap-3">
                                    <TbTruckDelivery className="stock-icon" />
                                    <p className="mb-0">
                                        {product.countInStock > 0
                                            ? 'Finns i lager !'
                                            : 'Slut i lager !'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="product-description d-flex flex-column">
                            <h3 className="mb-5">Produktbeskrivning</h3>
                            {!loading && product.description && !showMore
                                ? product.description.substring(0, 143)
                                : product.description}
                            <button
                                className={showMore ? 'visually-hidden' : 'btn-white mt-3'}
                                onClick={() => setShowMore(!showMore)}
                            >
                                Läs mer ...
                            </button>
                        </div>
                        <Row>
                            <Col md={6}>
                                <h3 className="my-5">Recensioner</h3>
                                {product.reviews.length === 0 && (
                                    <Message variant="dark">Inga recensioner.</Message>
                                )}
                                <ListGroup variant="flush">
                                    {product.reviews.map((review) => (
                                        <ListGroup.Item key={review._id}>
                                            <p className="mt-1">
                                                <strong>{review.name}</strong>
                                            </p>
                                            <Rating value={review.rating} />
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                    <ListGroup.Item>
                                        <h3 className="my-5">Skriv en recension</h3>
                                        {successProductReview && (
                                            <Message variant="success">
                                                Review submitted successfully
                                            </Message>
                                        )}
                                        {loadingProductReview && <Loader />}
                                        {errorProductReview && (
                                            <Message variant="danger">{errorProductReview}</Message>
                                        )}
                                        {userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId="rating">
                                                    <Form.Label>Betyg</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        className="rate-options form-select-lg mb-5"
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Välj...</option>
                                                        <option value="1">1 Stjärna</option>
                                                        <option value="2">2 Stjärnor</option>
                                                        <option value="3">3 Stjärnor</option>
                                                        <option value="4">4 Stjärnor</option>
                                                        <option value="5">5 Stjärnor</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="comment">
                                                    <Form.Label>Kommentar</Form.Label>
                                                    <Form.Control
                                                        className="comment-text-area"
                                                        as="textarea"
                                                        row="5"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                        required
                                                    />
                                                    <button
                                                        disabled={loadingProductReview}
                                                        type="submit"
                                                        className="btn-black my-4"
                                                    >
                                                        Skicka
                                                    </button>
                                                </Form.Group>
                                            </Form>
                                        ) : (
                                            <Message variant="dark">
                                                <Link className="link-black" to="/login">
                                                    Logga in
                                                </Link>{' '}
                                                för att skriva en recension
                                            </Message>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </>
                )}
            </div>
        </section>
    )
}

export default ProductDetails
