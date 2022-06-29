import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import LOGO from '../../assets/icons/shield.png'
import SHOPPINGCART from '../../assets/icons/shopping-bag.png'
import USER from '../../assets/icons/user.png'

// eslint-disable-next-line react/function-component-definition
const Header = () => {
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
                        <Link to="/login">
                            <img src={USER} alt="user icon" />
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
