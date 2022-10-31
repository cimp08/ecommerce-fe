/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { login } from '../actions/userAction'
import Meta from '../components/meta/Meta'
import './loginPage.css'

// eslint-disable-next-line react/function-component-definition
const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : ''

    useEffect(() => {
        if (userInfo) {
            navigate(`/${redirect}`)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <div className="section-login">
            <Meta title="Logga in" />
            <div className="center">
                <h2>Hej! Logga in</h2>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <form onSubmit={submitHandler}>
                    <div className="txt_field">
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></input>
                        <span></span>
                        <label>E-post</label>
                    </div>
                    <div className="txt_field">
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        ></input>
                        <span></span>
                        <label>Lösenord</label>
                    </div>
                    <button className="btn-black w-100" type="submit">
                        Logga in
                    </button>
                </form>
                <p>
                    Ny kund?{' '}
                    <Link
                        className="link-black"
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}
                    >
                        Registera dig här!
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage
