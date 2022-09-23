/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { BsXLg, BsCheckLg } from 'react-icons/bs'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { listUsers, deleteUser } from '../actions/userAction'
import './userListPage.css'

// eslint-disable-next-line react/function-component-definition
const UserListPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo, successDelete])

    const deleteHandler = (id) => {
        // eslint-disable-next-line no-alert, no-undef
        if (window.confirm('Ta bort användare?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div className="section-userlist">
            <div className="userlist">
                <h2 className="text-center mb-5">Användare</h2>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAMN</th>
                                <th>EPOST</th>
                                <th>ADMIN</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td className="name">{user.name}</td>
                                    <td>
                                        <a className="link-black" href={`mailto:${user.email}`}>
                                            {user.email}
                                        </a>
                                    </td>
                                    <td>
                                        {user.isAdmin ? (
                                            <IconContext.Provider
                                                // eslint-disable-next-line react/jsx-no-constructed-context-values
                                                value={{
                                                    color: 'green',
                                                }}
                                            >
                                                <BsCheckLg />
                                            </IconContext.Provider>
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
                                    <td className="action">
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <button
                                                type="button"
                                                className="me-5 fs-1 bg-transparent text-primary"
                                            >
                                                <FaEdit />
                                            </button>
                                        </LinkContainer>
                                        <button
                                            className="fs-1 bg-transparent text-danger"
                                            type="button"
                                            onClick={() => {
                                                deleteHandler(user._id)
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </div>
    )
}

export default UserListPage
