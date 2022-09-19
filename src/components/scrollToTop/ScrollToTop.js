import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// eslint-disable-next-line react/function-component-definition
const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        // eslint-disable-next-line no-undef
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, [pathname])

    return null
}

export default ScrollToTop
