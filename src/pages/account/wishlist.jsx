import { Pagination, Skeleton } from 'antd'
import React from 'react'
import Paginate from '../../component/Paginate'
import { useCurrentPage, useQuery } from '../../core'
import profileService from '../../service/profile.service'
import ProductCard from '../../component/ProductCard'

export default function Wishlist() {

    const currentPage = useCurrentPage()
    const { data, paginate, loading } = useQuery(() => profileService.getWishlist(`?page=${currentPage}`), [ currentPage ])

    // console.log('data', data)
    return (
        <>
            <div>
                <div className="row">
                    {
                        loading ? [ ...Array(6) ].map((e, i) => <Skeleton key={ i } style={ { height: 250 } } />)
                            : data.map(e => <ProductCard key={ e._id } { ...e.product } />)
                    }
                </div>
                {/* Pagination */ }
                <Paginate totalPage={ paginate.totalPage } />
            </div>

        </>
    )
}
