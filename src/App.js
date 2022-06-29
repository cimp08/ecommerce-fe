import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'

// eslint-disable-next-line react/function-component-definition
const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} exact />
                    <Route path="/product/:id" element={<ProductPage />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    )
}

export default App
