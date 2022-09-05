/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { getUserDetails } from '../actions/userAction'
import './registerPage.css'

// eslint-disable-next-line react/function-component-definition
const UserEditPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const { id } = useParams()
    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    useEffect(() => {
        if (!user.name || user._id !== id) {
            dispatch(getUserDetails(id))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, id, user])

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <Link to="/admin/userlist" className="btn btn-light my-3">
                Tillbaka
            </Link>
            <div className="section-register">
                <div className="center">
                    <h2>Editera Användare</h2>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant="danger">{error}</Message>
                    ) : (
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
                            <div controlId="isAdmin">
                                <input
                                    type="checkbox"
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                    required
                                ></input>
                                <span></span>
                                <label>Är Admin?</label>
                            </div>
                            <button type="submit">Uppdatera</button>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}

export default UserEditPage
