import Button from '../component/Button'
import React from 'react'
import { useState } from 'react'
import ViewCartItem from '../component/ViewCartItem'
import { useAsync } from '../core'
import { useCart } from '../hooks/useCart'
import cartService from '../service/cart.service'
import { currency } from '../utils/currency'
import { useDispatch } from 'react-redux'
import { getCartAction } from '../store/cartReducer'
import { useEffect } from 'react'
import { generatePath, Link, Navigate } from 'react-router-dom'
import { path } from '../config/path'
import TotalBill from '../component/TotalBill'

export default function ViewCart() {

    const { cart } = useCart()
    const [ promotion, setPromotion ] = useState('')
    const { error: errPromotion, loading, execute: addPromotion } = useAsync(cartService.addPromotion)
    const dispatch = useDispatch()
    useEffect(() => {
        if (cart.promotionCode) {
            setPromotion(cart.promotionCode)
        }
    }, cart.promotionCode)

    const onAddPromotion = async (ev) => {
        ev.preventDefault()
        if (promotion.trim()) {
            await addPromotion({ promotionCode: promotion })
            dispatch(getCartAction())
        }

    }

    if (cart?.totalQuantity === 0) {
        return <Navigate to={ path.Shop } />
    }

    return (
        <>
            <section className="pt-7 pb-12">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Heading */ }
                            <h3 className="mb-10 text-center">Shopping Cart</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-7">
                            {/* List group */ }
                            <ul className="list-group list-group-lg list-group-flush-x mb-6">
                                {
                                    cart?.listItems?.map(ev => <ViewCartItem key={ ev._id } { ...ev } />)
                                }
                            </ul>
                            {/* Footer */ }
                            <div className="row align-items-end justify-content-between mb-10 mb-md-0">
                                <div className="col-12 col-md-7">
                                    {/* Coupon */ }
                                    <form className="mb-7 mb-md-0" onSubmit={ onAddPromotion }>
                                        <label className="font-size-sm font-weight-bold" htmlFor="cartCouponCode">
                                            Coupon code:
                                        </label>
                                        <p style={ { color: 'red' } }>{ errPromotion }</p>
                                        <div className="row form-row">
                                            <div className="col">
                                                {/* Input */ }
                                                <input value={ promotion } onChange={ (ev) => setPromotion(ev.currentTarget.value) } className="form-control form-control-sm" id="cartCouponCode" type="text" placeholder="Enter coupon code*" />
                                            </div>
                                            <div className="col-auto">
                                                {/* Button */ }
                                                <Button loading={ loading } className="btn btn-sm btn-dark" type="submit">
                                                    Apply
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/* <div className="col-12 col-md-auto">
                                    <button className="btn btn-sm btn-outline-dark">Update Cart</button>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
                            {/* Total */ }
                            <TotalBill >

                                <li className="list-group-item font-size-sm text-center text-gray-500">
                                    Shipping cost calculated at Checkout *
                                </li>
                            </TotalBill>
                            {/* Button */ }
                            <Link className="btn btn-block btn-dark mb-2" to={ path.Checkout }>Proceed to Checkout</Link>
                            {/* Link */ }
                            <Link className="btn btn-link btn-sm px-0 text-body" to={ path.Shop }>
                                <i className="fe fe-arrow-left mr-2" /> Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
