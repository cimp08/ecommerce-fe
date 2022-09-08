/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { BsXLg } from 'react-icons/bs'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { listOrders } from '../actions/orderActions'
import './userListPage.css'

// eslint-disable-next-line react/function-component-definition
const OrderListPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo])

    return (
        <div className="container userlist__section">
            <h2>Ordrar</h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ANVÄNDARE</th>
                            <th>DATUM</th>
                            <th>TOTALT</th>
                            <th>BETALD</th>
                            <th>LEVERERAD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
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
                                        <Button variant="light" className="btn-lg">
                                            Detaljer
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default OrderListPage
