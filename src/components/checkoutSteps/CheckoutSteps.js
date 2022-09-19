/* eslint-disable react/function-component-definition */
import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to="/login">
                        <Nav.Link className="link-checkout">Logga in</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Logga in</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to="/shipping">
                        <Nav.Link className="link-checkout">Leverans</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Leverans</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to="/payment">
                        <Nav.Link className="link-checkout">Betalning</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Betalning</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to="/placeorder">
                        <Nav.Link className="link-checkout">Lägg Beställning</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Lägg Beställning</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
