/* eslint-disable no-lonely-if */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { getUserDetails, updateUser } from '../actions/userAction'
import { USER_UPDATE_RESET } from '../constans/userConstans'
import './registerPage.css'

// eslint-disable-next-line react/function-component-definition
const UserEditPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        } else {
            if (!user.name || user._id !== id) {
                dispatch(getUserDetails(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, id, user, successUpdate, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: id, name, email, isAdmin }))
    }

    return (
        <>
            <Link to="/admin/userlist" className="btn btn-light my-3">
                Tillbaka
            </Link>
            <div className="section-register">
                <div className="center">
                    <h2>Editera Användare</h2>
                    {loadingUpdate && <Loader />}
                    {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
