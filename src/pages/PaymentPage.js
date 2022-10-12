/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Col } from 'react-bootstrap'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/checkoutSteps/CheckoutSteps'
import './paymentPage.css'
import Meta from '../components/meta/Meta'

// eslint-disable-next-line react/function-component-definition
const PaymentPage = () => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (!shippingAddress) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <div className="section-payment">
            <Meta title="Betalning" />
            <div className="center">
                <CheckoutSteps step1 step2 step3 />
                <h2>Betalningsmetod</h2>
                <form onSubmit={submitHandler}>
                    <Form.Group>
                        <Col className="py-5">
                            <Form.Check
                                type="radio"
                                label="Paypal eller Kreditkort"
                                id="PayPal"
                                name="paymentMethod"
                                value="PayPal"
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check>
                        </Col>
                    </Form.Group>
                    <button className="btn-black w-100" type="submit">
                        Lägg Beställning
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PaymentPage
