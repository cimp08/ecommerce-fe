import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './header.css'
import { LinkContainer } from 'react-router-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { AiOutlineShopping, AiOutlineUser } from 'react-icons/ai'
import LOGO from '../../assets/icons/shield.png'
import { logout } from '../../actions/userAction'
import Searchbar from '../searchbar/Searchbar'

// eslint-disable-next-line react/function-component-definition
const Header = () => {
    // eslint-disable-next-line no-unused-vars
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <nav>
                <div className="navbar d-flex justify-content-between">
                    <Link
                        className="navbar-logo d-flex align-items-center gap-2 text-dark text-decoration-none"
                        to="/"
                        aria-label="start"
                    >
                        <img src={LOGO} alt="black logotype" />
                        <p>
                            glas<span>skydd</span>.se
                        </p>
                    </Link>

                    <div className="navbar-search d-flex align-items-center justify-content-center flex-wrap gap-5">
                        <Searchbar />
                        <Link to="/cart" aria-label="start">
                            <AiOutlineShopping className="icon-cart" />
                        </Link>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="username" className="pt-2">
                                <LinkContainer to="/profile" aria-label="profile">
                                    <NavDropdown.Item>Profil</NavDropdown.Item>
                                </LinkContainer>
                                {userInfo.isAdmin && (
                                    <>
                                        <LinkContainer to="/admin/userlist" aria-label="userlist">
                                            <NavDropdown.Item>Användare</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer
                                            to="/admin/productlist"
                                            aria-label="productlist"
                                        >
                                            <NavDropdown.Item>Produkter</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/orderlist" aria-label="orderlist">
                                            <NavDropdown.Item>Ordrar</NavDropdown.Item>
                                        </LinkContainer>
                                    </>
                                )}
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logga ut
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Link to="/login" aria-label="profile">
                                <AiOutlineUser className="icon-user" />
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
