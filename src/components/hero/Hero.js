import React from 'react'
import { Link } from 'react-router-dom'
import './hero.css'
import HERO from '../../assets/img/hero.png'

// eslint-disable-next-line react/function-component-definition
const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-section-container">
                <div className="hero-section-product">
                    <div className="hero-section-text">
                        <h1>glasskydd 3HD</h1>
                        <h3>iphone 13 mini</h3>
                        <p>Hitta det perfekta skyddet för din mobil.</p>
                    </div>
                    <img className="hero-section-img" src={HERO} alt="iphone 13" />
                </div>
                <div className="hero-section-bar">
                    <ul className="hero-section-specs">
                        <li>
                            <span>märke</span> apple
                        </li>
                        <li>
                            <span>model</span> iphone 13 mini
                        </li>
                        <li>
                            <span>färg</span> transparent
                        </li>
                        <li>
                            <span>pris</span> 69:-
                        </li>
                        <li>
                            <Link
                                to="/product/632c55f725c2b5b03294153d"
                                className="text-decoration-none"
                            >
                                lägg till
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Hero
