/* eslint-disable no-underscore-dangle */
import React from 'react'
import Card from '../card/Card'
import products from '../../products'
import './featured.css'

// eslint-disable-next-line react/function-component-definition
const Featured = () => {
    return (
        <section className="featured__section">
            <h3>populära produkter</h3>
            <div className="featured__section-cards">
                {products.map((product) => (
                    <Card key={product._id} product={product} />
                ))}
            </div>
        </section>
    )
}

export default Featured
