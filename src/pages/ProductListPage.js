/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BiEdit } from 'react-icons/bi'
import { BsPlus } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import Paginate from '../components/paginate/Paginate'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constans/productConstans'
import './productListPage.css'

// eslint-disable-next-line react/function-component-definition
const ProductListPage = () => {
    const { pageNumber } = useParams() || 1

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList

    const productDelete = useSelector((state) => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            navigate('/login')
        }

        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', '', pageNumber))
        }
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, pageNumber])

    const deleteHandler = (id) => {
        // eslint-disable-next-line no-alert, no-undef
        if (window.confirm('Ta bort produkt?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <div className="section-productlist">
            <div className="productlist">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <h2>Produkter</h2>
                    <button className="btn-black my-3" type="button" onClick={createProductHandler}>
                        <BsPlus /> Skapa Produkt
                    </button>
                </div>

                {loadingDelete && <Loader />}
                {errorDelete && <Message variant="danger">{errorDelete}</Message>}
                {loadingCreate && <Loader />}
                {errorCreate && <Message variant="danger">{errorCreate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <>
                        <Table striped bordered hover responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>MODELL</th>
                                    <th>PRIS</th>
                                    <th>KATEGORI</th>
                                    <th>MÄRKE</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td className="name">{product.name}</td>
                                        <td className="price-list">{product.price} kr</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td className="action">
                                            <LinkContainer
                                                to={`/admin/product/${product._id}/edit`}
                                            >
                                                <button
                                                    className="me-5 fs-1 bg-transparent text-primary"
                                                    type="button"
                                                >
                                                    <BiEdit />
                                                </button>
                                            </LinkContainer>
                                            <button
                                                className="fs-1 bg-transparent text-danger"
                                                type="button"
                                                onClick={() => {
                                                    deleteHandler(product._id)
                                                }}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Paginate pages={pages} page={page} isAdmin={true} />
                    </>
                )}
            </div>
        </div>
    )
}

export default ProductListPage
