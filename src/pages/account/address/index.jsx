import React from 'react'
import { useState } from 'react'
import { generatePath, Link } from 'react-router-dom'
import AddressCard from '../../../component/AddressCard'
import { path } from '../../../config/path'
import { useQuery } from '../../../core'
import profileService from '../../../service/profile.service'

export default function Address() {

    const { loading, data, execute } = useQuery(() => profileService.getAddress())
    const newPath = generatePath(path.Account.AddressAction, { action: 'new' })
    return (
        <>
            <div className="row">

                {
                    data && data.map(ev => (
                        <AddressCard key={ ev._id } address={ ev } onRemove={ execute } />
                    ))
                }

                <div className="col-12">
                    {/* Button */ }
                    <Link className="btn btn-block btn-lg btn-outline-border" to={ newPath }>
                        Add Address <i className="fe fe-plus" />
                    </Link>
                </div>
            </div>

        </>
    )
}
