import { Drawer } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { generatePath, Link, useNavigate } from 'react-router-dom'
import { path } from '../config/path'
import { useCart } from '../hooks/useCart'
import usePage from '../hooks/usePage'
import { toggleCartDrawerAction } from '../store/pageReducer'
import { currency } from '../utils/currency'
import CartItem from './CartItem'

export default function CartDrawer() {
    const dispatch = useDispatch()
    const { openCartModal } = usePage()
    const { cart } = useCart()
    const navigate = useNavigate()

    const onCloseCartDrawer = () => {
        dispatch(toggleCartDrawerAction(false))
    }



    return (
        <>
            <Drawer width={ 420 } open={ openCartModal } headerStyle={ { display: 'none' } } bodyStyle={ { padding: 0 } }>
                <div className="modal-dialog modal-dialog-vertical" role="document">
                    {/* Full cart (add `.d-none` to disable it) */ }
                    <div className="modal-content">
                        {/* Close */ }
                        <button onClick={ () => dispatch(toggleCartDrawerAction()) } type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <i className="fe fe-x" aria-hidden="true" />
                        </button>
                        {/* Header*/ }
                        <div className="modal-header line-height-fixed font-size-lg">
                            <strong className="mx-auto">Your Cart ({ cart?.totalQuantity })</strong>
                        </div>
                        {/* List group */ }
                        <ul className="list-group list-group-lg list-group-flush">
                            {
                                cart?.listItems?.map(ev => <CartItem enableAction key={ ev.product.id } { ...ev } />)
                            }

                        </ul>
                        {/* Footer */ }
                        <div className="modal-footer line-height-fixed font-size-sm bg-light mt-auto">
                            <strong>Subtotal:</strong> <strong className="ml-auto">{ currency(cart?.subTotal || 0) } vnđ</strong>
                        </div>
                        {/* Buttons */ }
                        <div className="modal-body">
                            <Link onClick={ onCloseCartDrawer } className="btn btn-block btn-dark" to={ path.Checkout }>Continue to Checkout</Link>
                            <Link onClick={ onCloseCartDrawer } className="btn btn-block btn-outline-dark" to={ path.ViewCart }>View Cart</Link>
                        </div>
                    </div>
                    {/* Empty cart (remove `.d-none` to enable it) */ }
                    <div className="modal-content d-none">
                        {/* Close */ }
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <i className="fe fe-x" aria-hidden="true" />
                        </button>
                        {/* Header*/ }
                        <div className="modal-header line-height-fixed font-size-lg">
                            <strong className="mx-auto">Your Cart (0)</strong>
                        </div>
                        {/* Body */ }
                        <div className="modal-body flex-grow-0 my-auto">
                            {/* Heading */ }
                            <h6 className="mb-7 text-center">Your cart is empty 😞</h6>
                            {/* Button */ }
                            <a className="btn btn-block btn-outline-dark" href="#!">
                                Continue Shopping
                            </a>
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    )
}
