/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { createUser } from '../actions/userAction'
import './userCreatePage.css'
import { USER_CREATE_RESET } from '../constans/userConstans'

// eslint-disable-next-line react/function-component-definition
const UserCreatePage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userCreate = useSelector((state) => state.userCreate)
    const { loading, error, success } = userCreate

    useEffect(() => {
        if (success) {
            dispatch({ type: USER_CREATE_RESET })
            navigate('/admin/userlist')
        }
    }, [success, navigate, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Lösenordet matchar inte')
        } else {
            dispatch(createUser(name, email, password, isAdmin))
        }
    }

    return (
        <div className="section-user-create">
            <div className="mb-5 ms-5">
                <Link to="/admin/userlist" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Tillbaka
                </Link>
            </div>
            <div className="center">
                <h2>Skapa Användare</h2>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <form onSubmit={submitHandler}>
                    <div className="txt_field" name="name">
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
                    <div className="txt_field" name="email">
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
                    <div className="txt_field" name="password">
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
                    <div className="txt_field" name="confirmPassword">
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
                    <div name="isAdmin">
                        <input
                            id="isAdmin"
                            type="checkbox"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        ></input>
                        <span></span>
                        <label className="ms-4">Admin</label>
                    </div>
                    <button className="btn-black w-100 mt-5" type="submit">
                        Skapa
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UserCreatePage
