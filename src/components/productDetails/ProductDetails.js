/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, ListGroup, Button } from 'react-bootstrap'
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

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const { success: successProductReview, error: errorProductReview } = productReviewCreate

    // Get the id from the url
    const { id } = useParams()
    const navigate = useNavigate()
    /* const [showMore, setShowMore] = useState(false) */

    useEffect(() => {
        if (successProductReview) {
            // eslint-disable-next-line no-alert, no-undef
            alert('Din recension är lämnad')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(id))
    }, [dispatch, id, successProductReview])

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
                        <Meta title={product.name} />
                        <div className="product__item">
                            <div className="product__item-img">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="product__item-info">
                                <div className="price-rating">
                                    <p className="price">{product.price} kr</p>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} recensioner`}
                                    />
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
                        <Row>
                            <Col md={6}>
                                <h3>Recensioner</h3>
                                {product.reviews.length === 0 && (
                                    <Message>Inga recensioner</Message>
                                )}
                                <ListGroup variant="flush">
                                    {product.reviews.map((review) => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} />
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                    <ListGroup.Item>
                                        <h3>Skriv en recension</h3>
                                        {errorProductReview && (
                                            <Message variant="danger">{errorProductReview}</Message>
                                        )}
                                        {userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId="rating">
                                                    <Form.Label>Betyg</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                    >
                                                        <option value="">Välj...</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="comment">
                                                    <Form.Label>Kommentar</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        row="3"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    />
                                                    <Button type="submit" variant="primary">
                                                        Skicka
                                                    </Button>
                                                </Form.Group>
                                            </Form>
                                        ) : (
                                            <Message>
                                                <Link to="/login">Logga in</Link> för att skriva en
                                                recension
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
