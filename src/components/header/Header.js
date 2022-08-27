import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './header.css'
import { LinkContainer } from 'react-router-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import LOGO from '../../assets/icons/shield.png'
import SHOPPINGCART from '../../assets/icons/shopping-bag.png'
import USER from '../../assets/icons/user.png'
import { logout } from '../../actions/userAction'

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
                <div className="navbar">
                    <Link className="navbar__logo" to="/">
                        <img src={LOGO} alt="white logotype" />
                        <h2>
                            glas<span>skydd</span>.se
                        </h2>
                    </Link>

                    <div className="navbar__search">
                        <input type="search" className="navbar__search-bar" />
                        <Link to="/cart">
                            <img src={SHOPPINGCART} alt="shoppingcart icon" />
                        </Link>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="username" className="dropdown">
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Link to="/login">
                                <img src={USER} alt="user icon" />
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
