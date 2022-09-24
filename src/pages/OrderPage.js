/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constans/orderConstans'
import './orderPage.css'

// eslint-disable-next-line react/function-component-definition
const OrderPage = () => {
    // Get the id from the url
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    if (!loading) {
        // Calculate prices
        order.itemsPrice = order.orderItems.reduce((acc, item) => {
            return acc + item.price * item.qty
        }, 0)
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/config/paypal`
            )

            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=SEK`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay || successDeliver || order._id !== id) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, id, successPay, order, successDeliver])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <div className="section-order">
            <div className="order-container">
                <h2 className="mb-5">
                    Beställning <span>({order._id})</span>
                </h2>
                <Row>
                    <Col md={8}>
                        <ListGroup>
                            <ListGroup.Item className="bg-transparent py-4">
                                <p className="mt-3 fs-2 text-uppercase">Leverans</p>
                                <p>{order.user.name}</p>
                                <p>
                                    <a className="link-black" href={`mailto:${order.user.email}`}>
                                        {order.user.email}
                                    </a>
                                </p>
                                <p>
                                    {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                                    {order.shippingAddress.postalCode},{' '}
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (
                                    <Message variant="success">
                                        Levererad: {order.deliveredAt.substring(0, 10)}.
                                    </Message>
                                ) : (
                                    <Message variant="danger">Inte levererad.</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item className="bg-transparent py-4">
                                <p className="mt-3 fs-2 text-uppercase">Betalning</p>
                                <p>{order.paymentMethod}</p>
                                {order.isPaid ? (
                                    <Message variant="success">
                                        Betald: {order.paidAt.substring(0, 10)}.
                                    </Message>
                                ) : (
                                    <Message variant="danger">Ingen betalning.</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item className="bg-transparent py-4">
                                <p className="mt-3 fs-2 text-uppercase">Artiklar</p>
                                {order.orderItems.length === 0 ? (
                                    <Message>Beställningen är tom</Message>
                                ) : (
                                    <ListGroup>
                                        {order.orderItems.map((item, index) => (
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
                                        <Col>{order.itemsPrice} kr</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className="mt-2">
                                        <Col>Frakt</Col>
                                        <Col>
                                            {order.shippingPrice === 0
                                                ? 'Gratis'
                                                : `${order.shippingPrice} kr`}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className="mt-2">
                                        <Col>Moms</Col>
                                        <Col>{order.taxPrice} kr</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item className="mb-4">
                                    <Row className="mt-2">
                                        <Col>
                                            <strong>Totalt</strong>
                                        </Col>
                                        <Col>
                                            <strong>{order.totalPrice} kr</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader />}
                                        {!sdkReady ? (
                                            <Loader />
                                        ) : (
                                            <PayPalButton
                                                amount={order.totalPrice}
                                                currency="SEK"
                                                onSuccess={successPaymentHandler}
                                            />
                                        )}
                                    </ListGroup.Item>
                                )}
                                {loadingDeliver && <Loader />}
                                {userInfo &&
                                    userInfo.isAdmin &&
                                    order.isPaid &&
                                    !order.isDelivered && (
                                        <ListGroup.Item>
                                            <button
                                                type="button"
                                                className="btn-black w-100 mb-3"
                                                onClick={deliverHandler}
                                            >
                                                Ändra till levererad
                                            </button>
                                        </ListGroup.Item>
                                    )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default OrderPage
