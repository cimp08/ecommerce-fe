/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions'
import './shippingPage.css'

// eslint-disable-next-line react/function-component-definition
const ShippingPage = () => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }

    return (
        <div className="section-shipping">
            <div className="center">
                <h2>Shipping</h2>
                <form onSubmit={submitHandler}>
                    <div className="txt_field" controlId="address">
                        <input
                            id="address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        ></input>
                        <span></span>
                        <label>Adress</label>
                    </div>
                    <div className="txt_field" controlId="postalCode">
                        <input
                            id="postalCode"
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                        ></input>
                        <span></span>
                        <label>Postnummer</label>
                    </div>
                    <div className="txt_field" controlId="city">
                        <input
                            id="city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        ></input>
                        <span></span>
                        <label>Stad</label>
                    </div>
                    <div className="txt_field" controlId="country">
                        <input
                            id="country"
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        ></input>
                        <span></span>
                        <label>Land</label>
                    </div>
                    <button type="submit">Fortsätt</button>
                </form>
            </div>
        </div>
    )
}

export default ShippingPage
