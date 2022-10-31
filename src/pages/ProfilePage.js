/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-lonely-if */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { IconContext } from 'react-icons'
import { BsXLg } from 'react-icons/bs'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { listMyOrders } from '../actions/orderActions'
import './profilePage.css'
import { USER_UPDATE_PROFILE_RESET } from '../constans/userConstans'
import Meta from '../components/meta/Meta'

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

    const orderMyList = useSelector((state) => state.orderMyList)
    const { loading: loadingOrders, error: errorOrders, orders } = orderMyList

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(userInfo.name)
                setEmail(userInfo.email)
            }
        }
    }, [dispatch, navigate, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Lösenordet matchar inte')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    return (
        <div className="section-profile d-flex justify-content-around flex-wrap">
            <Meta title="Min Profil" />
            <div className="center">
                <h2>Min Profil</h2>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {success && <Message variant="success">Konto uppdaterat</Message>}
                {loading && <Loader />}
                <form onSubmit={submitHandler}>
                    <div className="txt_field">
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
                        ></input>
                        <span></span>
                        <label>
                            Nytt lösenord <small>*(frivilligt)</small>
                        </label>
                    </div>
                    <div className="txt_field">
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></input>
                        <span></span>
                        <label>Bekräfta lösenord</label>
                    </div>
                    <button type="submit" className="btn-black w-100">
                        Uppdatera konto
                    </button>
                </form>
            </div>
            <div className="myorders-section">
                <h2 className="text-center mb-5">Mina Ordrar</h2>
                {loadingOrders ? <Loader /> : null}
                {errorOrders ? <Message variant="danger">{errorOrders}</Message> : null}
                {orders && orders.length ? (
                    <Table striped bordered hover className="table-sm">
                        <thead>
                            <tr>
                                <th>Order nummer</th>
                                <th className="min-width">Datum</th>
                                <th className="min-width">Totalt</th>
                                <th>Betald</th>
                                <th>Levererad</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice} kr</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <IconContext.Provider
                                                // eslint-disable-next-line react/jsx-no-constructed-context-values
                                                value={{
                                                    color: 'red',
                                                }}
                                            >
                                                <BsXLg />
                                            </IconContext.Provider>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <IconContext.Provider
                                                // eslint-disable-next-line react/jsx-no-constructed-context-values
                                                value={{
                                                    color: 'red',
                                                }}
                                            >
                                                <BsXLg />
                                            </IconContext.Provider>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <button type="button" className="link-black">
                                                Detaljer
                                            </button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <Message variant="danger">Inte handlat tidigare</Message>
                )}
            </div>
        </div>
    )
}

export default ProfilePage
