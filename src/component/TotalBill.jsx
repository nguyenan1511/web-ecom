import React from 'react'
import { useAsync } from '../core'
import { useCart } from '../hooks/useCart'
import cartService from '../service/cart.service'
import { currency } from '../utils/currency'

export default function TotalBill({ children, showShipping, showTax }) {
    const { cart } = useCart()
    // const { execute: precheckout, loading: loadPreCheckout, error: errPreCheckout } = useAsync(cartService.precheckout)
    return (
        <>
            <div className="card mb-7 bg-light">
                <div className="card-body">
                    <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                        <li className="list-group-item d-flex">
                            <span>Subtotal</span> <span className="ml-auto font-size-sm">{ currency(cart?.subTotal || 0) } vnđ</span>
                        </li>
                        {
                            showTax && <li className="list-group-item d-flex">
                                <span>Tax</span> <span className="ml-auto font-size-sm">{ currency(cart?.tax) } vnđ</span>
                            </li>
                        }
                        {
                            showShipping && <li className="list-group-item d-flex">
                                <span>Shipping</span> <span className="ml-auto font-size-sm"> { currency(cart?.shipping) } vnđ </span>
                            </li>
                        }
                        <li className="list-group-item d-flex">
                            <span>Promotion: ({ cart?.promotionCode }) </span> <span className="ml-auto font-size-sm"> - { currency(cart?.promotionPrice) } vnđ </span>
                        </li>
                        <li className="list-group-item d-flex font-size-lg font-weight-bold">
                            <span>Total</span> <span className="ml-auto font-size-sm">{ currency(cart?.total) } vnđ</span>
                        </li>
                        { children }
                    </ul>
                </div>
            </div>
        </>
    )
}
