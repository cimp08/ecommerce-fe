import React from 'react'
import { Spinner } from 'react-bootstrap'

// eslint-disable-next-line react/function-component-definition
const Loader = () => {
    return (
        <Spinner
            animation="border"
            role="status"
            style={{ width: '100px', height: '100px', margin: 'auto', display: 'block' }}
        >
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
}

export default Loader
