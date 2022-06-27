import React from 'react'
import Card from '../card/Card'
import './featured.css'

// eslint-disable-next-line react/function-component-definition
const Featured = () => {
    return (
        <section className="featured__section">
            <h3>populära produkter</h3>
            <div className="featured__section-cards">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </section>
    )
}

export default Featured
