import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ShippingPage from './pages/ShippingPage'

// eslint-disable-next-line react/function-component-definition
const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/shipping" element={<ShippingPage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/cart/:id" element={<CartPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/" element={<HomePage />} exact />
                </Routes>
            </main>
            <Footer />
        </Router>
    )
}

export default App
