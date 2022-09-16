import React from 'react'
import { Helmet } from 'react-helmet'

// eslint-disable-next-line react/function-component-definition
const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keyword" content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Glasskydd.se',
    description: 'Säljer prisvärda glasskydd',
    keywords: 'glasskydd, skärskydd, displayskydd, shield, skydd, köp glasskydd, billiga glasskydd',
}

export default Meta
