/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/message/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Meta from '../components/meta/Meta'
import './cartPage.css'

// eslint-disable-next-line react/function-component-definition
const CartPage = () => {
    // Get the id from the url
    const { id } = useParams()
    // eslint-disable-next-line prefer-destructuring
    const [searchParams] = useSearchParams()
    const qty = searchParams.get('qty')
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    // eslint-disable-next-line no-shadow
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    return (
        <div className="section-cart">
            <Meta title="Kundvagn" />
            <div className="cart-container">
                <Row>
                    <Col md={8}>
                        <h2 className="mb-5">Kundvagn</h2>
                        {cartItems.length === 0 ? (
                            <Message variant="dark">
                                Din kundvagn är tom.{' '}
                                <Link className="link-black" to="/">
                                    Fortsätt handla
                                </Link>
                            </Message>
                        ) : (
                            <ListGroup>
                                {cartItems.map((item) => (
                                    <ListGroup.Item
                                        className="bg-transparent py-4"
                                        key={item.product}
                                    >
                                        <Row>
                                            <Col md={2}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fluid
                                                    rounded
                                                />
                                            </Col>
                                            <Col md={3}>
                                                <Link
                                                    className="link-black"
                                                    to={`/product/${item.product}`}
                                                >
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={2}>{item.price} kr</Col>
                                            <Col md={2}>
                                                <Form.Select
                                                    className="stock-options"
                                                    size="lg"
                                                    value={item.qty}
                                                    onChange={(e) =>
                                                        dispatch(
                                                            addToCart(
                                                                item.product,
                                                                Number(e.target.value)
                                                            )
                                                        )
                                                    }
                                                >
                                                    {[...Array(item.countInStock).keys()].map(
                                                        (x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        )
                                                    )}
                                                </Form.Select>
                                            </Col>
                                            <Col md={2}>
                                                <button
                                                    className="link-red mt-1"
                                                    type="button"
                                                    onClick={() =>
                                                        removeFromCartHandler(item.product)
                                                    }
                                                >
                                                    Ta bort
                                                </button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </Col>
                    <Col md={4}>
                        <Card className="mt-3">
                            <ListGroup>
                                <ListGroup.Item>
                                    <p className="mt-3 fs-2 text-uppercase">
                                        Totalt:{' '}
                                        {cartItems.reduce((acc, item) => acc + item.qty * 1, 0)}{' '}
                                        artiklar
                                    </p>
                                    <p className="my-4">
                                        <strong>
                                            Att betala:{' '}
                                            {cartItems.reduce(
                                                (acc, item) => acc + item.qty * item.price,
                                                0
                                            )}{' '}
                                            kr
                                        </strong>
                                    </p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        type="button"
                                        className="btn-black w-100 my-4"
                                        disabled={cartItems.length === 0}
                                        onClick={checkoutHandler}
                                    >
                                        Fortsätt
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default CartPage
