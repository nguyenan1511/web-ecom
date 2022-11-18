import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Input from '../../../component/Input'
import { useAsync, useForm, useQuery } from '../../../core'
import { path } from '../../../config/path'
import profileService from '../../../service/profile.service'
import Button from '../../../component/Button'
import { message } from 'antd'
import { useEffect } from 'react'

export default function AddressAction() {

    const param = useParams()
    const action = param.action
    const id = param[ '*' ]
    const navigate = useNavigate()

    const { execute: addAddress, error: errorAdd, loadingAdd } = useAsync(profileService.addAddress)
    const { execute: editAddress, error, errorEdit: loadingEdit } = useAsync(profileService.editAddress)


    // if (action == 'new') {
    //     return
    // }

    const { form, setForm, setError, validate, register } = useForm({
        fullName: [
            { required: true }
        ],
        email: [
            { required: true },
            { regexp: 'email' }
        ],
        phone: [
            { required: true },
            { regexp: 'phone' }
        ],
        province: [
            { required: true },
        ],
        district: [
            { required: true },
        ],
        address: [
            { required: true },

        ]
    })
    // if (id) {

    //     const { data } = useQuery(() => profileService.getAddress(id))
    //     console.log(data)
    // }
    const { data: address } = useQuery(async () => id ? profileService.getAddress(id) : undefined)
    // console.log('address', address)
    useEffect(() => {
        if (address) {
            setForm(address)

        }

    }, [ address ])

    const onSubmit = async (ev) => {
        ev.preventDefault()
        try {
            if (validate()) {
                if (action === 'new') {
                    await addAddress(form)
                    message.success('Đăng ký địa chỉ thành công!')

                } else { // (action === 'edit') {
                    await editAddress(id, form)
                    message.success('Cập nhật địa chỉ thành công!')
                }
                navigate(path.Account.Address)
            }
        }
        catch (err) {
            message.error(err)
        }

    }

    if (!(action === 'new' || action === 'edit'))
        // if (![ 'new ', 'edit' ].includes(action))
        return <Navigate to={ path.Account.Address } />

    return (
        <>
            <div>
                {/* Heading */ }
                <h6 className="mb-7">
                    Add Address
                </h6>
                {/* Form */ }
                <form onSubmit={ onSubmit }>
                    <div className="row">
                        <div className="col-12 ">
                            {/* <div className="form-group">
                                <label htmlFor="firstName">First Name *</label>
                                <input className="form-control" id="firstName" type="text" placeholder="First Name" required />
                            </div> */}
                            <Input
                                placeholder='Full Name '
                                label='Full Name *'
                                { ...register('fullName') }
                            />
                        </div>

                        <div className="col-12">
                            {/* <div className="form-group">
                                <label htmlFor="emailAddress">Email Address *</label>
                                <input className="form-control" id="emailAddress" type="email" placeholder="Email Address" required />
                            </div> */}
                            <Input
                                placeholder='Email Address'
                                label='Email Address*'
                                { ...register('email') }
                            />
                        </div>

                        <div className="col-12 ">
                            <Input
                                placeholder='Address'
                                label='Address *'
                                { ...register('address') }
                            />
                        </div>
                        <div className="col-12 col-md-6 ">
                            <Input
                                placeholder='District'
                                label='District *'
                                { ...register('district') }
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            {/* <div className="form-group">
                                <label htmlFor="country">Country *</label>
                                <input className="form-control" id="country" type="text" placeholder="Country" required />
                            </div> */}
                            <Input
                                placeholder='Province / City'
                                label='Province / City *'
                                { ...register('province') }
                            />
                        </div>


                        <div className="col-12">
                            {/* <div className="form-group">
                                <label htmlFor="companyName">Company Name</label>
                                <input className="form-control" id="companyName" type="text" placeholder="Company Name" required />
                            </div> */}
                            <Input
                                placeholder='Number Phone'
                                label='Number Phone *'
                                { ...register('phone') }
                            />
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <div className="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id="defaultDeliveryAddress" />
                                    <label className="custom-control-label" htmlFor="defaultDeliveryAddress">Default delivery address</label>
                                </div>
                                <div className="custom-control custom-checkbox mb-0">
                                    <input type="checkbox" className="custom-control-input" id="defaultShippingAddress" />
                                    <label className="custom-control-label" htmlFor="defaultShippingAddress">Default shipping address</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Button */ }
                    <Button loading={ loadingAdd || loadingEdit } className="btn btn-dark" type="submit">
                        Add Address
                    </Button>
                </form>
            </div>

        </>
    )
}
