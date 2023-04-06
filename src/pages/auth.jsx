import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Button from '../component/Button'
import Input from '../component/Input'
import { path } from '../config/path'
import { useAsync, useForm } from '../core'
import { useAuth } from '../core/hooks/useAuth'
import { useReduxAsync } from '../core/hooks/useReduxAsync'
import authService from '../service/auth.service'
import { loginAction, registerAction } from '../store/authReducer'

export default function Auth() {

    const dispatch = useDispatch()
    const [ errorMessage, setErrorMessage ] = useState()
    const [ loading, setLoading ] = useState()

    // const { loading, error: loginError, action: loginA } = useReduxAsync((data) => loginAction(data))
    const { user } = useAuth()
    const { loading: loadingRegister, error: errorRegisterMessage, execute: register } = useAsync((data) => authService.register(data))

    // const [ errorRegisterMessage, setErrorRegisterMessage ] = useState()
    // const [ loadingRegister, setLoadingRegister ] = useState()

    const loginForm = useForm({
        username: [
            { required: true },
            { regexp: 'email' }
        ],

        password: [
            { required: true },
            // {min: 6, max: 32},
            // {regexp: 'password'}
        ]

    })

    const registerForm = useForm({
        username: [
            { required: true },
            { regexp: 'email' }
        ],

        password: [
            { required: true },

        ],

        name: [
            { required: true }
        ],

        confirmPassword: [
            { required: true },
            { confirm: 'password' }
        ]
    })

    const onLogin = (ev) => {
        ev.preventDefault()

        if (loginForm.validate()) {
            setErrorMessage('')
            setLoading(true)
            dispatch(loginAction({
                form: loginForm.form,
                success: () => {
                    setLoading(false)
                },
                error: (err) => {
                    setErrorMessage(err.message)
                }
            }))
        }

    }

    const onRegister = async (ev) => {
        ev.preventDefault()

        // if(registerForm.form.confirmPassword !== registerForm.form.password) {
        //     registerForm.setError((pevState) => ({...pevState.error, confirmPassword: 'Vui long dien giong Password!'}))
        //     return
        // }

        if (registerForm.validate()) {

            await register(registerForm.form, 1)
            dispatch(loginAction({
                form: {
                    username: registerForm.form.username,
                    password: registerForm.form.password
                }

            }))
            // setErrorRegisterMessage('')
            // setLoadingRegister(true);
            // console.log(' registerForm.form', registerForm.form)
            // dispatch(registerAction({
            //     form: registerForm.form,
            //     success: () => {
            //         setLoadingRegister(false)
            //     },
            //     error: (err) => {
            //         setErrorRegisterMessage(err.message)
            //     }
            // }))
        }
        console.log('user', user)
    }

    if (user)
        return <Navigate to={ path.Account.Profile } />

    return (
        <>
            <section className="py-12">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            {/* Card */ }
                            <div className="card card-lg mb-10 mb-md-0">
                                <div className="card-body">
                                    {/* Heading */ }
                                    <h6 className="mb-7">Returning Customer</h6>
                                    {/* Form */ }
                                    <form onSubmit={ onLogin }>
                                        <div className="row">
                                            <div className="col-12">
                                                {/* Email */ }
                                                {/* <div className="form-group">
                                        <label className="sr-only" htmlFor="loginEmail">
                                        Email Address *
                                        </label>
                                        <input className="form-control form-control-sm" id="loginEmail" type="email" placeholder="Email Address *" required />
                                    </div> */}
                                                <Input
                                                    placeholder="Email Address *"
                                                    // defaultValue ={loginForm.form.username}
                                                    // onChange = {(ev ) => loginForm.form.username = ev.currentTarget.value}
                                                    // error={loginForm.error.username}
                                                    { ...loginForm.register('username') }

                                                />
                                            </div>
                                            <div className="col-12">
                                                {/* Password */ }
                                                {/* <div className="form-group">
                                        <label className="sr-only" htmlFor="loginPassword">
                                        Password *
                                        </label>
                                        <input className="form-control form-control-sm" id="loginPassword" type="password" placeholder="Password *" required />
                                    </div> */}
                                                <Input
                                                    placeholder="Password *"
                                                    // defaultValue={loginForm.form.password} 
                                                    // onChange={(ev) => loginForm.form.password = ev.currentTarget.value}
                                                    // error={loginForm.error.password}
                                                    { ...loginForm.register('password') }
                                                    type="password"
                                                />
                                            </div>
                                            <div className="col-12 col-md">
                                                {/* Remember */ }
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input className="custom-control-input" id="loginRemember" type="checkbox" />
                                                        <label className="custom-control-label" htmlFor="loginRemember">
                                                            Remember me
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-auto">
                                                {/* Link */ }
                                                <div className="form-group">
                                                    <a className="font-size-sm text-reset" data-toggle="modal" href="#modalPasswordReset">Forgot
                                                        Password?</a>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                {/* Button */ }
                                                <Button loading={ loading } >
                                                    Sign In
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            {/* Card */ }
                            <div className="card card-lg">
                                <div className="card-body">
                                    {/* Heading */ }
                                    <h6 className="mb-7">New Customer</h6>
                                    <p>{ errorRegisterMessage }</p>
                                    {/* Form */ }
                                    <form onSubmit={ onRegister }>
                                        <div className="row">

                                            <div className="col-12">
                                                {/* Email */ }
                                                <Input
                                                    placeholder='Full Name *'
                                                    { ...registerForm.register('name') }
                                                />
                                            </div>
                                            <div className="col-12">
                                                {/* Email */ }
                                                <Input
                                                    placeholder='Email Address *'
                                                    { ...registerForm.register('username') }
                                                />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                {/* Password */ }
                                                <Input
                                                    placeholder='Password *'
                                                    { ...registerForm.register('password') }
                                                    type="password"
                                                />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                {/* Password */ }
                                                <Input
                                                    placeholder='Confirm Password *'
                                                    { ...registerForm.register('confirmPassword') }
                                                    type="password"
                                                />
                                            </div>
                                            <div className="col-12 col-md-auto">
                                                {/* Link */ }
                                                <div className="form-group font-size-sm text-muted">
                                                    By registering your details, you agree with our Terms &amp; Conditions,
                                                    and Privacy and Cookie Policy.
                                                </div>
                                            </div>
                                            <div className="col-12 col-md">
                                                {/* Newsletter */ }
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input className="custom-control-input" id="registerNewsletter" type="checkbox" />
                                                        <label className="custom-control-label" htmlFor="registerNewsletter">
                                                            Sign me up for the Newsletter!
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                {/* Button */ }
                                                <Button loading={ loadingRegister }>
                                                    Register
                                                </Button>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
