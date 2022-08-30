/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions'
import Message from '../components/message/Message'
import CheckoutSteps from '../components/checkoutSteps/CheckoutSteps'

// eslint-disable-next-line react/function-component-definition
const PlaceOrderPage = () => {
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

    const placeOrderHandler = () => {
        // eslint-disable-next-line no-console
        console.log('order')
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Leverans</h2>
                            <p>
                                <strong>Adress: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Betalning</h2>
                            <p>
                                <strong>Alternativ: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Artiklar i Ordern</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Din kundvagn är tom</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        // eslint-disable-next-line react/no-array-index-key
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} st x {item.price} kr ={' '}
                                                    {item.qty * item.price} kr
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
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Sammanfattning Beställning</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Artiklar</Col>
                                    <Col>{cart.itemsPrice} kr</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Leverans</Col>
                                    <Col>
                                        {cart.shippingPrice === 0
                                            ? 'Gratis'
                                            : `${cart.shippingPrice} kr`}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Moms</Col>
                                    <Col>{cart.taxPrice} kr</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Totalt</Col>
                                    <Col>{cart.totalPrice} kr</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Lägg Beställning
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderPage
