import { Spin } from 'antd'
import React from 'react'
import { generatePath, Link } from 'react-router-dom'
import { path } from '../config/path'
import { useAsync } from '../core'
import profileService from '../service/profile.service'

export default function AddressCard({ address, onRemove }) {

    const { execute: deleteAddress, loading, error } = useAsync(profileService.deleteAddress)

    const _onRemove = () => {
        deleteAddress(address._id)
        onRemove?.()
    }
    return (
        <>

            <div className="col-12 col-lg-6">
                {/* Card */ }

                <div className="card card-lg bg-light mb-8">
                    <div className="card-body">
                        {/* Heading */ }
                        <h6 className="mb-6">
                            Shipping Address
                        </h6>
                        {/* Text */ }
                        <p className="text-muted mb-0">
                            { address.fullName } <br />
                            { address.email } <br />
                            { address.address } -
                            District { address.district }
                            - { address.province } <br />
                            { address.phone } <br />
                        </p>
                        {/* Action */ }
                        <div className="card-action card-action-right">
                            {/* Button */ }
                            <Link className="btn btn-xs btn-circle btn-white-primary" to={ generatePath(path.Account.AddressAction, { action: 'edit', '*': address._id }) }>
                                <i className="fe fe-edit-2" />
                            </Link>
                            {/* Button */ }
                            {
                                loading ? <Spin /> : <button onClick={ _onRemove } className="btn btn-xs btn-circle btn-white-primary">
                                    <i className="fe fe-x" />
                                </button>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
