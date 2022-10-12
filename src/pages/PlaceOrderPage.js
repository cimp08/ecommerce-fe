/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Message from '../components/message/Message'
import CheckoutSteps from '../components/checkoutSteps/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import './placeOrderPage.css'
import { USER_DETAILS_RESET } from '../constans/userConstans'
import { ORDER_CREATE_RESET } from '../constans/orderConstans'
import Meta from '../components/meta/Meta'

// eslint-disable-next-line react/function-component-definition
const PlaceOrderPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector((state) => state.cart)

    // Function to print 2 decimals even if it ends with 0.
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    // Calculate prices
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => {
        return acc + item.price * item.qty
    }, 0)

    // If its more then 499kr its free shipping othervise 29kr
    cart.shippingPrice = cart.itemsPrice > 499 ? 0 : 29

    // Calculate swedish moms
    cart.taxPrice = addDecimals(Number((0.2 * cart.itemsPrice).toFixed(2)))

    // Calculate total
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice

    const orderCreate = useSelector((state) => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            // eslint-disable-next-line no-underscore-dangle
            navigate(`/order/${order._id}`)
            dispatch({ type: USER_DETAILS_RESET })
            dispatch({ type: ORDER_CREATE_RESET })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, success])

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        )
    }

    return (
        <div className="section-place-order">
            <Meta title="Beställning" />
            <div className="place-order-container">
                <CheckoutSteps step1 step2 step3 step4 />
                <h2 className="my-5">Avsluta beställning</h2>
                <Row>
                    <Col md={8}>
                        <ListGroup>
                            <ListGroup.Item className="bg-transparent py-4">
                                <p className="mt-3 fs-2 text-uppercase">Leverans</p>
                                <p>
                                    {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                                    {cart.shippingAddress.postalCode},{' '}
                                    {cart.shippingAddress.country}
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item className="bg-transparent py-4">
                                <p className="mt-3 fs-2 text-uppercase">Betalning</p>
                                <p>{cart.paymentMethod}</p>
                            </ListGroup.Item>

                            <ListGroup.Item className="bg-transparent py-4">
                                <p className="mt-3 fs-2 text-uppercase">Artiklar i Ordern</p>
                                {cart.cartItems.length === 0 ? (
                                    <Message>Din kundvagn är tom</Message>
                                ) : (
                                    <ListGroup>
                                        {cart.cartItems.map((item, index) => (
                                            // eslint-disable-next-line react/no-array-index-key
                                            <ListGroup.Item
                                                className="bg-transparent border border-top-0 border-end-0 border-start-0 py-4"
                                                key={index}
                                            >
                                                <Row>
                                                    <Col md={1}>
                                                        <Image
                                                            className="mb-3"
                                                            src={item.image}
                                                            alt={item.name}
                                                            fluid
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Link
                                                            className="link-checkout"
                                                            to={`/product/${item.product}`}
                                                        >
                                                            <p className="mt-1">{item.name}</p>
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        <p>
                                                            {item.qty} st x {item.price} kr ={' '}
                                                            {item.qty * item.price} kr
                                                        </p>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item>
                                    <p className="mt-3 fs-2 text-uppercase">
                                        Sammanfattning Beställning
                                    </p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className="mt-2">
                                        <Col>Artiklar</Col>
                                        <Col>{cart.itemsPrice} kr</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className="mt-2">
                                        <Col>Leverans</Col>
                                        <Col>
                                            {cart.shippingPrice === 0
                                                ? 'Gratis'
                                                : `${cart.shippingPrice} kr`}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className="mt-2">
                                        <Col>Moms</Col>
                                        <Col>{cart.taxPrice} kr</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className="mt-2">
                                        <Col>Totalt</Col>
                                        <Col>{cart.totalPrice} kr</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {error && <Message variant="danger">{error}</Message>}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        type="button"
                                        className="btn-black w-100 my-4"
                                        disabled={cart.cartItems === 0}
                                        onClick={placeOrderHandler}
                                    >
                                        Avsluta Beställning
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

export default PlaceOrderPage
