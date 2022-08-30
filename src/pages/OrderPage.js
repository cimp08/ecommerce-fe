/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { getOrderDetails } from '../actions/orderActions'

// eslint-disable-next-line react/function-component-definition
const OrderPage = () => {
    // Get the id from the url
    const { id } = useParams()
    // eslint-disable-next-line no-console
    console.log(id)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    if (!loading) {
        // Calculate prices
        order.itemsPrice = order.orderItems.reduce((acc, item) => {
            return acc + item.price * item.qty
        }, 0)
    }

    useEffect(() => {
        dispatch(getOrderDetails(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <>
            <h2 className="mb-5">Beställning ({order._id})</h2>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Leverans</h2>
                            <p>
                                <strong>Name: </strong>
                                {order.user.name}
                            </p>
                            <p>
                                <strong>Epost: </strong>
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Adress: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant="success">Levererad: {order.deliveredAt}.</Message>
                            ) : (
                                <Message variant="danger">Inte levererad.</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Betalning</h2>
                            <p>
                                <strong>Alternativ: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">Betald: {order.paidAt}.</Message>
                            ) : (
                                <Message variant="danger">Ingen betalning.</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Artiklar</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>Beställningen är tom</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
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
                                    <Col>{order.itemsPrice} kr</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Frakt</Col>
                                    <Col>
                                        {order.shippingPrice === 0
                                            ? 'Gratis'
                                            : `${order.shippingPrice} kr`}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Moms</Col>
                                    <Col>{order.taxPrice} kr</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Totalt</Col>
                                    <Col>{order.totalPrice} kr</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderPage
