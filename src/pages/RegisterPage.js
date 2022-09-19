/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { register } from '../actions/userAction'
import './registerPage.css'

// eslint-disable-next-line react/function-component-definition
const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Lösenordet matchar inte')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <div className="section-register">
            <div className="center">
                <h2>Skapa konto</h2>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <form onSubmit={submitHandler}>
                    <div className="txt_field" controlId="name">
                        <input
                            id="name"
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        ></input>
                        <span></span>
                        <label>Namn</label>
                    </div>
                    <div className="txt_field" controlId="email">
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
                    <div className="txt_field" controlId="password">
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
                    <div className="txt_field" controlId="confirmPassword">
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        ></input>
                        <span></span>
                        <label>Bekräfta lösenord</label>
                    </div>
                    <button className="btn-black w-100" type="submit">
                        Skapa konto !
                    </button>
                </form>
                <p>
                    Har du ett konto?{' '}
                    <Link
                        className="link-black"
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}
                    >
                        Logga in!
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage
