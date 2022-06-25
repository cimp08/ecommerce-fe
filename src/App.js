import './App.css'
import React from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

// eslint-disable-next-line react/function-component-definition
const App = () => {
    return (
        <>
            <main>
                <Header />
                <h1>MAIN</h1>
            </main>
            <Footer />
        </>
    )
}

export default App
