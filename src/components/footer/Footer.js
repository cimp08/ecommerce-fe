import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
import EMAIL from '../../assets/icons/email.png'
import LOGO from '../../assets/icons/shield-white.png'
import YOUTUBE from '../../assets/icons/youtube.png'
import INSTAGRAM from '../../assets/icons/instagram.png'
import FACEBOOK from '../../assets/icons/facebook.png'

// eslint-disable-next-line react/function-component-definition
const Footer = () => {
    return (
        <footer>
            <div className="footer__newsletter">
                <div className="footer__newsletter-container">
                    <p>
                        Prenumerera på vårt nyhetsbrev för att hålla dig uppdaterad med senaste
                        produkterna och erbjudanden!
                    </p>
                    <div className="input-container">
                        <img src={EMAIL} alt="email icon" />
                        <input placeholder="Epost" />
                    </div>
                </div>
            </div>
            <div className="footer__links">
                <div>
                    <h3>PRODUKTER</h3>
                    <ul>
                        <li>
                            <Link to="/" className="footer__links-link">
                                Nyheter
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer__links-link">
                                Toppsäljare
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer__links-link">
                                Rea
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3>HJÄLP</h3>
                    <ul>
                        <li>
                            <Link to="/" className="footer__links-link">
                                Order
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer__links-link">
                                Frakt
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer__links-link">
                                Returer & Byten
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer__links-link">
                                Kontakta Oss
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3>OM OSS</h3>
                    <ul>
                        <li>
                            <Link to="/" className="footer__links-link">
                                Om glasskydd.se
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer__links-link">
                                Cookiepolicy
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer__links-link">
                                Hållbarhet
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer__socials">
                <div className="container footer__socials-container">
                    <Link to="/" className="footer__socials-logo">
                        <img src={LOGO} alt="white logotype" />
                        <h2>
                            glas<span>skydd</span>.se
                        </h2>
                    </Link>
                    <div className="footer__socials-copyright">
                        <p>© 2022 Glasskydd, Inc. All rights reserved.</p>
                    </div>
                    <div className="footer__socials-icons">
                        <img src={YOUTUBE} alt="youtube logotype" />
                        <img src={INSTAGRAM} alt="instragram logotype" />
                        <img src={FACEBOOK} alt="facebook logotype" />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
