/* eslint-disable no-lonely-if */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { listProductDetails } from '../actions/productActions'
import './registerPage.css'

// eslint-disable-next-line react/function-component-definition
const ProductEditPage = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const { id } = useParams()
    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        if (!product.name || product._id !== id) {
            dispatch(listProductDetails(id))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }, [dispatch, id, product])

    const submitHandler = (e) => {
        e.preventDefault()
        // UPDATE PRODUCT
    }

    return (
        <>
            <Link to="/admin/productlist" className="btn btn-light my-3">
                Tillbaka
            </Link>
            <div className="section-register">
                <div className="center">
                    <h2>Editera Produkt</h2>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant="danger">{error}</Message>
                    ) : (
                        <form onSubmit={submitHandler}>
                            <div className="txt_field" controlId="name">
                                <input
                                    id="name"
                                    type="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                ></input>
                                <span></span>
                                <label>Modell</label>
                            </div>
                            <div className="txt_field" controlId="price">
                                <input
                                    id="price"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                ></input>
                                <span></span>
                                <label>Pris (sek)</label>
                            </div>
                            <div className="txt_field" controlId="image">
                                <input
                                    id="image"
                                    type="text"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    required
                                ></input>
                                <span></span>
                                <label>Bild</label>
                            </div>
                            <div className="txt_field" controlId="brand">
                                <input
                                    id="brand"
                                    type="text"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    required
                                ></input>
                                <span></span>
                                <label>Märke</label>
                            </div>
                            <div className="txt_field" controlId="countInStock">
                                <input
                                    id="countInStock"
                                    type="number"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                    required
                                ></input>
                                <span></span>
                                <label>Antal i lager</label>
                            </div>
                            <div className="txt_field" controlId="category">
                                <input
                                    id="category"
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                ></input>
                                <span></span>
                                <label>Kategori</label>
                            </div>
                            <div className="txt_field" controlId="description">
                                <input
                                    id="description"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></input>
                                <span></span>
                                <label>Beskrivning</label>
                            </div>
                            <button type="submit">Uppdatera</button>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProductEditPage
