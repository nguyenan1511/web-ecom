import React from 'react'
import { generatePath, Link, Navigate, useParams } from 'react-router-dom'
import { path } from '../config/path'
import { useQuery } from '../core'
import orderService from '../store/order.service'

export default function OrderCompleted() {

    const { id } = useParams()
    const { data: order, loading } = useQuery(() => orderService.getOrderDetail(id), [ id ]) // dependencies = [id] for checking everytime 

    if (loading === false && order === null) {
        return <Navigate to={ '/' } />
    }

    return (
        <section className="py-12">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                        {/* Icon */ }
                        <div className="mb-7 font-size-h1">❤️</div>
                        {/* Heading */ }
                        <h2 className="mb-5">Your Order is Completed!</h2>
                        {/* Text */ }
                        <p className="mb-7 text-gray-500">
                            Your order <span className="text-body text-decoration-underline">{ id }</span> has been completed. Your order
                            details
                            are shown for your personal accont.
                        </p>
                        {/* Button */ }
                        <Link className="btn btn-dark" to={ generatePath(path.Account.MyOrderDetail, { id }) }>
                            View My Orders
                        </Link>
                    </div>
                </div>
            </div>
        </section>

    )
}
