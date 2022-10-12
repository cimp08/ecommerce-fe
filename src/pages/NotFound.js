import React from 'react'
import Meta from '../components/meta/Meta'
import './notFound.css'

// eslint-disable-next-line react/function-component-definition
const NotFound = () => {
    return (
        <div className="section-notfound">
            <Meta title="Fel adress..." />
            <h2>HOPPSAN! DEN SIDAN KAN INTE HITTAS.</h2>
        </div>
    )
}

export default NotFound
