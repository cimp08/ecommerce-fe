import React from 'react'
import './products.css'
import Card from '../card/Card'

// eslint-disable-next-line react/function-component-definition
const Products = () => {
    return (
        <section className="products__section">
            <div className="products__section-container">
                <div className="products__section-bar">
                    <ul className="products__section-brands">
                        <li>
                            <a className="active" href="/">
                                Apple
                            </a>
                        </li>
                        <li>
                            <a href="/">Samsung</a>
                        </li>
                        <li>
                            <a href="/">Sony</a>
                        </li>
                        <li>
                            <a href="/">Huwaei</a>
                        </li>
                        <li>
                            <a href="/">Xiaomi</a>
                        </li>
                    </ul>
                </div>
                <h3>Apple</h3>

                <div className="products__section-products">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </section>
    )
}

export default Products
