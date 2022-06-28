/* eslint-disable no-underscore-dangle */
import React from 'react'
import './card.css'

// eslint-disable-next-line react/function-component-definition
const Card = ({ product }) => {
    return (
        <div className="card__content">
            <div className="card__content-img">
                <img src={product.image} alt="screen protector" />
            </div>
            <p className="card__content-brand">{product.brand}</p>
            <p className="card__content-model">{product.name}</p>
            <p className="card__content-price">Pris {product.price}:-</p>
            <p className="card__content-rating">
                {product.rating} av {product.numReviews}
            </p>
            <a href={`/products/${product._id}`}>info</a>
        </div>
    )
}

export default Card
