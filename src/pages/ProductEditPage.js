/* eslint-disable no-lonely-if */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import './productEditPage.css'
import { PRODUCT_UPDATE_RESET } from '../constans/productConstans'
import Meta from '../components/meta/Meta'

// eslint-disable-next-line react/function-component-definition
const ProductEditPage = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
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
        }
    }, [dispatch, id, navigate, product, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        // eslint-disable-next-line no-undef
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/upload`,
                formData,
                config
            )
            setImage(data)
            setUploading(false)
            // eslint-disable-next-line no-shadow
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updateProduct({
                _id: id,
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
            })
        )
    }

    return (
        <div className="section-product-edit">
            <Meta title="Admin | Produkter" />
            <div className="mb-5 ms-5">
                <Link to="/admin/productlist" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Tillbaka
                </Link>
            </div>
            <div className="center">
                <h2>Uppdatera Produkt</h2>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
                            <input
                                className="mt-3"
                                type="file"
                                id="image-file"
                                label="Välj fil"
                                accept="image/png, image/jpeg, image/jpg"
                                custom
                                onChange={uploadFileHandler}
                            ></input>
                            {uploading && <Loader />}
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
                        <button className="btn-black w-100" type="submit">
                            Uppdatera
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ProductEditPage
