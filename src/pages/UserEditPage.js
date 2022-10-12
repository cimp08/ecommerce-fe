/* eslint-disable no-lonely-if */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { getUserDetails, updateUser } from '../actions/userAction'
import { USER_UPDATE_RESET } from '../constans/userConstans'
import './userEditPage.css'
import Meta from '../components/meta/Meta'

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
        <div className="section-user-edit">
            <Meta title="Admin | Användare" />
            <div className="mb-5 ms-5">
                <Link to="/admin/userlist" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Tillbaka
                </Link>
            </div>
            <div className="center">
                <h2>Användare</h2>
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
                            <label className="ms-4">Admin</label>
                        </div>
                        <button className="btn-black w-100 mt-5" type="submit">
                            Uppdatera
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default UserEditPage
