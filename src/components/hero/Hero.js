import React from 'react'
import { Link } from 'react-router-dom'
import './hero.css'
import HERO from '../../assets/img/hero.png'

// eslint-disable-next-line react/function-component-definition
const Hero = () => {
    return (
        <section className="hero__section">
            <div className="hero__section-container">
                <div className="hero__section-product">
                    <div className="hero__section-text">
                        <h1>glasskydd 3HD</h1>
                        <h3>iphone 13</h3>
                        <p>Hitta det perfekta skyddet för din mobil.</p>
                    </div>
                    <img className="hero__section-img" src={HERO} alt="iphone 13" />
                </div>
                <div className="hero__section-bar">
                    <ul className="hero__section-specs">
                        <li>
                            <span>märke</span> apple
                        </li>
                        <li>
                            <span>model</span> iphone 13
                        </li>
                        <li>
                            <span>färg</span> transparent
                        </li>
                        <li>
                            <span>pris</span> 69:-
                        </li>
                        <li>
                            <Link to="/">lägg till</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Hero
