import './App.css'
import React from 'react'
import Header from './components/header/Header'
import Hero from './components/hero/Hero'
import Footer from './components/footer/Footer'

// eslint-disable-next-line react/function-component-definition
const App = () => {
    return (
        <>
            <Header />
            <main>
                <Hero />
            </main>
            <Footer />
        </>
    )
}

export default App
