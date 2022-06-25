import React from 'react'
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
                    <div className="navbar__logo">
                        <img src={LOGO} alt="white logotype" />
                        <h2>
                            glas<span>skydd</span>.se
                        </h2>
                    </div>
                    <div className="navbar__search">
                        <input type="search" className="navbar__search-bar" />
                        <img src={SHOPPINGCART} alt="shoppingcart icon" />
                        <img src={USER} alt="user icon" />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
