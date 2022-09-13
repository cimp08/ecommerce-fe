/* eslint-disable no-nested-ternary */
import React from 'react'
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs'
import './rating.css'

// eslint-disable-next-line react/function-component-definition
const Rating = ({ value, text, color }) => {
    return (
        <div className="rating">
            {value >= 1 ? (
                <BsStarFill style={{ color }} />
            ) : value >= 0.5 ? (
                <BsStarHalf style={{ color }} />
            ) : (
                <BsStar style={{ color }} />
            )}
            {value >= 2 ? (
                <BsStarFill style={{ color }} />
            ) : value >= 1.5 ? (
                <BsStarHalf style={{ color }} />
            ) : (
                <BsStar style={{ color }} />
            )}
            {value >= 3 ? (
                <BsStarFill style={{ color }} />
            ) : value >= 2.5 ? (
                <BsStarHalf style={{ color }} />
            ) : (
                <BsStar style={{ color }} />
            )}
            {value >= 4 ? (
                <BsStarFill style={{ color }} />
            ) : value >= 3.5 ? (
                <BsStarHalf style={{ color }} />
            ) : (
                <BsStar style={{ color }} />
            )}
            {value >= 5 ? (
                <BsStarFill style={{ color }} />
            ) : value >= 4.5 ? (
                <BsStarHalf style={{ color }} />
            ) : (
                <BsStar style={{ color }} />
            )}
            <p>{text && text}</p>
        </div>
    )
}

Rating.defaultProps = {
    color: '#f8e825',
}

export default Rating
