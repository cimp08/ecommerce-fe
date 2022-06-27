import React from 'react'
import './card.css'
import IMG from '../../assets/img/apple-iphone-xxs11.webp'

// eslint-disable-next-line react/function-component-definition
const Card = () => {
    return (
        <div className="card__content">
            <div className="card__content-img">
                <img src={IMG} alt="screen protector" />
            </div>
            <p className="card__content-brand">Apple</p>
            <p className="card__content-model">iphone 13 pro -5g</p>
            <p className="card__content-price">Pris 69:-</p>
            <a href="/">lägg till</a>
        </div>
    )
}

export default Card
