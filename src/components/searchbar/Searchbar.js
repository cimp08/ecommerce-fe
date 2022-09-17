import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './searchbar.css'

// eslint-disable-next-line react/function-component-definition
const Searchbar = () => {
    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            <form onSubmit={submitHandler}>
                <input
                    className="navbar-searchbar"
                    type="text"
                    name="q"
                    onChange={(e) => setKeyword(e.target.value)}
                    // eslint-disable-next-line no-return-assign
                    onBlur={(e) => (e.target.value = '')}
                />
            </form>
        </>
    )
}

export default Searchbar
