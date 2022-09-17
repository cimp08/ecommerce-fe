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
            <div className="footer-newsletter">
                <div className="footer-newsletter-container d-flex align-items-center gap-3 text-center">
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
            <div className="footer-links">
                <div>
                    <h3 className="mb-3">PRODUKTER</h3>
                    <ul className="p-0">
                        <li>
                            <Link to="/" className="footer-links-link">
                                Nyheter
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer-links-link">
                                Toppsäljare
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer-links-link">
                                Rea
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-3">HJÄLP</h3>
                    <ul className="p-0">
                        <li>
                            <Link to="/" className="footer-links-link">
                                Order
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer-links-link">
                                Frakt
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer-links-link">
                                Returer & Byten
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer-links-link">
                                Kontakta Oss
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-3">OM OSS</h3>
                    <ul className="p-0">
                        <li>
                            <Link to="/" className="footer-links-link">
                                Om glasskydd.se
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer-links-link">
                                Cookiepolicy
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer-links-link">
                                Hållbarhet
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-socials">
                <div className="container footer-socials-container">
                    <Link
                        to="/"
                        className="footer-socials-logo d-flex align-items-center gap-2 text-light text-decoration-none"
                    >
                        <img src={LOGO} alt="white logotype" />
                        <p>
                            glas<span>skydd</span>.se
                        </p>
                    </Link>
                    <div className="footer-socials-copyright">
                        <p>© Copyright 2022</p>
                    </div>
                    <div className="footer-socials-icons">
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
