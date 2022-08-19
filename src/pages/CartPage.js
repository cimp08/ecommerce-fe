/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/message/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import './cartPage.css'

// eslint-disable-next-line react/function-component-definition
const CartPage = ({ location, history }) => {
    // Get the id from the url
    const { id } = useParams()
    // eslint-disable-next-line prefer-destructuring
    const [searchParams] = useSearchParams()
    const qty = searchParams.get('qty')

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
        /* history.push('/login?redirect=shipping') */
    }

    return (
        <div className="cart__container">
            <Row>
                <Col md={8}>
                    <h1>Kundvagn</h1>
                    {cartItems.length === 0 ? (
                        <Message>
                            Din kundvagn är tom. <Link to="/">Fortsätt handla</Link>
                        </Message>
                    ) : (
                        <ListGroup variant="flush">
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>{item.price} kr</Col>
                                        <Col md={2}>
                                            <Form.Select
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
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                type="button"
                                                variant="light"
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                Ta bort
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>
                                    Totalt {cartItems.reduce((acc, item) => acc + item.qty * 1, 0)}{' '}
                                    artiklar
                                </h2>
                                {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)} kr
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CartPage
