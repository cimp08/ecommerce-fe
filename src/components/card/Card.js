/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Link } from 'react-router-dom'
import './card.css'
import Rating from '../rating/Rating'

// eslint-disable-next-line react/function-component-definition
const Card = ({ product }) => {
    return (
        <Link className="card-content text-decoration-none" to={`/product/${product._id}`}>
            <div className="card-content-img d-flex justify-content-center align-items-center">
                <img src={product.image} alt="screen protector" />
            </div>
            <p className="card-content-brand">{product.brand}</p>
            <p className="card-content-model">{product.name}</p>
            <p className="card-content-price">Pris {product.price}:-</p>
            <Rating value={product.rating} text={`${product.numReviews} recensioner`} />
        </Link>
    )
}

export default Card
