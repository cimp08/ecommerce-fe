/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constans/orderConstans'

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

        if (!order || successPay || successDeliver) {
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
        // eslint-disable-next-line no-console
        console.log(order)
    }

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
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button
                                        type="button"
                                        className="btn btn-block"
                                        onClick={deliverHandler}
                                    >
                                        Ändra till levererad
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderPage
