import React from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../core/hooks/useAuth'
import { path } from '../config/path'

export default function ProfileLayout() {
    const { user } = useAuth()
    if (!user) return <Navigate to={ path.Auth } />
    return (
        <>
            <section className="pt-7 pb-12">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            {/* Heading */ }
                            <h3 className="mb-10">My Account</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-3">
                            {/* Nav */ }
                            <nav className="mb-10 mb-md-0">
                                <div className="list-group list-group-sm list-group-strong list-group-flush-x">
                                    <NavLink className="list-group-item list-group-item-action dropright-toggle " to={ path.Account.MyOrder }>
                                        Orders
                                    </NavLink>
                                    <NavLink className="list-group-item list-group-item-action dropright-toggle " to={ path.Account.Wishlist }>
                                        Wishlist
                                    </NavLink>
                                    <NavLink className="list-group-item list-group-item-action dropright-toggle " to={ path.Account.Profile }>
                                        Personal Info
                                    </NavLink>
                                    <NavLink className="list-group-item list-group-item-action dropright-toggle " to={ path.Account.Address }>
                                        Addresses
                                    </NavLink>
                                    <a className="list-group-item list-group-item-action dropright-toggle " href="account-payment.html">
                                        Payment Methods
                                    </a>
                                    <a className="list-group-item list-group-item-action dropright-toggle" href="#!">
                                        Logout
                                    </a>
                                </div>
                            </nav>
                        </div>
                        <div className="col-12 col-md-9 col-lg-8 offset-lg-1">

                            <Outlet />
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
