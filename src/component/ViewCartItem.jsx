import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeCartAction, updateQuantityCartAction } from '../store/cartReducer'
import { currency } from '../utils/currency'
import InputQuantity from './InputQuantity'

export default function ViewCartItem({ product, quantity }) {

    const dispatch = useDispatch()
    const onRemove = (ev) => {
        ev.preventDefault()
        dispatch(removeCartAction({ id: product.id }))
    }
    // console.log('id', product.configurable_options?.[ 1 ]?.values?.[ 0 ])
    return (
        <li className="list-group-item">
            <div className="row align-items-center">
                <div className="col-3">
                    {/* Image */ }
                    <a href="product.html">
                        <img src={ product.images?.[ 0 ]?.thumbnail_url } alt="..." className="img-fluid" />
                    </a>
                </div>
                <div className="col">
                    {/* Title */ }
                    <div className="d-flex mb-2 font-weight-bold">
                        <a className="text-body" href="product.html">{ product.name }</a> <span className="ml-auto">{ currency(product.real_price) } vnđ</span>
                    </div>
                    {/* Text */ }
                    <p className="mb-7 font-size-sm text-muted">
                        Nguồn: { product.specifications?.[ 0 ]?.attributes[ 2 ]?.value } <br />
                        Màu: { product.configurable_options?.[ 0 ]?.values?.[ 0 ]?.label }
                    </p>
                    {/*Footer */ }
                    <div className="d-flex align-items-center">
                        <InputQuantity
                            value={ quantity }
                            onIncrement={ () => {
                                dispatch(updateQuantityCartAction({
                                    id: product.id,
                                    quantity: quantity + 1
                                }))
                            } }
                            onDecrement={ () => {
                                dispatch(updateQuantityCartAction({
                                    id: product.id,
                                    quantity: quantity - 1
                                }))
                            } }
                        />
                        {/* Remove */ }
                        <Link onClick={ onRemove } className="font-size-xs text-gray-400 ml-auto" href="#!">
                            <i className="fe fe-x" /> Remove
                        </Link>
                    </div>
                </div>
            </div>
        </li>
    )
}
