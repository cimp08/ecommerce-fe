/* eslint-disable no-underscore-dangle */
/* eslint-disable no-lonely-if */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import './profilePage.css'

// eslint-disable-next-line react/function-component-definition
const ProfilePage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Lösenordet matchar inte')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    return (
        <div className="section-profile">
            <div className="flex">
                <div className="center">
                    <h2>Användar Profil</h2>
                    {message && <Message variant="danger">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}
                    {success && <Message variant="success">Konto uppdaterat</Message>}
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
                            <label>Ändra lösenord (frivilligt)</label>
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
                        <button type="submit">Uppdatera konto</button>
                    </form>
                </div>
                <div className="myorders-section">
                    <h2>My orders</h2>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
