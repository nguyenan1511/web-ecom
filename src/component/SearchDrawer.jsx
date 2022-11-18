import { Drawer, Skeleton, Spin } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { path } from '../config/path'
import { useAsync } from '../core/hooks/useAsync'
import { usePage } from '../hooks/usePage'
import productService from '../service/product.service'
import { toggleSearchDrawerAction } from '../store/pageReducer'
import { currency } from '../utils/currency'

export default function SearchDrawer() {
    const [ product, setProduct ] = useState([])
    const { openSearchModal } = usePage()
    const dispatch = useDispatch()

    const { execute: searchProduct, loading } = useAsync(productService.getProduct)
    let [ value, setValue ] = useState('')

    const onSearch = async (ev) => {
        ev.preventDefault()
        const vl = value.trim()

        if (vl) {
            const prod = await searchProduct('?limit=5&name=' + vl)
            setProduct(prod.data)

        }
    }

    const _path = path.Shop + '?search=' + value
    const onViewAll = (ev) => {
        dispatch(toggleSearchDrawerAction())
    }

    return (
        <Drawer open={ openSearchModal } headerStyle={ { display: 'none' } } bodyStyle={ { padding: 0 } } >
            <div className="modal-dialog modal-dialog-vertical" role="document">
                <div className="modal-content">
                    {/* Close */ }
                    <button onClick={ () => dispatch(toggleSearchDrawerAction()) } type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <i className="fe fe-x" aria-hidden="true" />
                    </button>
                    {/* Header*/ }
                    <div className="modal-header line-height-fixed font-size-lg">
                        <strong className="mx-auto">Search Products</strong>
                    </div>
                    {/* Body: Form */ }
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label className="sr-only" htmlFor="modalSearchCategories">Categories:</label>
                                <select className="custom-select" id="modalSearchCategories">
                                    <option selected>All Categories</option>
                                    <option>Women</option>
                                    <option>Men</option>
                                    <option>Kids</option>
                                </select>
                            </div>
                            <div className="input-group input-group-merge">
                                <input className="form-control" value={ value } onChange={ ev => value = setValue(ev.currentTarget.value) } type="search" placeholder="Search" />
                                <div className="input-group-append">
                                    {
                                        loading ? <Spin /> : <button onClick={ onSearch } className="btn btn-outline-border" type="submit">
                                            <i className="fe fe-search" />
                                        </button>
                                    }

                                </div>
                            </div>
                        </form>
                    </div>
                    {/* Body: Results (add `.d-none` to disable it) */ }
                    <div className="modal-body border-top font-size-sm">
                        {/* Heading */ }
                        <p>Search Results:</p>
                        {/* Items */ }

                        {
                            loading ? [ ...Array(5) ].map((e, i) => <Skeleton key={ i } style={ { height: 100, marginTop: 10 } } />) : product.map(ev => (
                                <div key={ ev.id } className="row align-items-center position-relative mb-5">
                                    <div className="col-4 col-md-3">
                                        {/* Image */ }
                                        <img className="img-fluid" src={ ev.images?.[ 0 ]?.thumbnail_url } alt="..." />
                                    </div>
                                    <div className="col position-static">
                                        {/* Text */ }
                                        <p className="mb-0 font-weight-bold">
                                            <a className="stretched-link text-body" href="./product.html">Leather mid-heel Sandals</a> <br />
                                            <span className="text-muted">{ currency(ev.real_price) } vnđ</span>
                                        </p>
                                    </div>
                                </div>
                            ))
                        }


                        {/* Button */ }
                        <Link className="btn btn-link px-0 text-reset" to={ _path } onClick={ onViewAll }>
                            View All <i className="fe fe-arrow-right ml-2" />
                        </Link>
                    </div>
                    {/* Body: Empty (remove `.d-none` to disable it) */ }
                    <div className="d-none modal-body">
                        {/* Text */ }
                        <p className="mb-3 font-size-sm text-center">
                            Nothing matches your search
                        </p>
                        <p className="mb-0 font-size-sm text-center">
                            😞
                        </p>
                    </div>
                </div>
            </div>

        </Drawer>
    )
}
