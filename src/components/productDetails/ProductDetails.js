/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TbTruckDelivery } from 'react-icons/tb'
import { BsArrowLeft } from 'react-icons/bs'
import Rating from '../rating/Rating'
import products from '../../products'
import './productDetails.css'

// eslint-disable-next-line react/function-component-definition
const ProductDetails = () => {
    const [showMore, setShowMore] = useState(false)
    // Get the id from the url
    const { id } = useParams()
    const product = products.find((p) => p._id === id)
    return (
        <section className="product__section">
            <div className="product__container">
                <Link className="back" to="/">
                    <BsArrowLeft className="back-icon" />
                    Tillbaka
                </Link>
                <div className="product__item">
                    <div className="product__item-img">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product__item-info">
                        <div className="price-rating">
                            <p className="price">{product.price} kr</p>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews} recensioner`}
                            />
                        </div>
                        <h3 className="name">Glasskydd 9HD- {product.name}</h3>
                        <button className="btn" disabled={product.countInStock === 0}>
                            Köp
                        </button>
                        <div className="stock">
                            <TbTruckDelivery className="stock-icon" />
                            <p>{product.countInStock > 0 ? 'Finns i lager !' : 'Slut i lager !'}</p>
                        </div>
                    </div>
                </div>
                <div className="product__description">
                    <h3>Produktbeskrivning</h3>
                    <p>
                        {showMore
                            ? product.description
                            : `${product.description.substring(0, 100)}`}
                    </p>
                    <button className="btn-read" onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Dölj' : 'Läs mer'}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ProductDetails
