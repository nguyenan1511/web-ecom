import { Spin } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addCartAction, removeCartAction } from '../store/cartReducer';
import { currency } from '../utils/currency';
import InputQuantity from './InputQuantity';


// const ButtonQuantity = styled.button`
//     width : 50px;
//     height: 38px;
//     border: none;
//     background: none;
//     outline: none;
// `
// const InputQuantity = styled.input`
//     width: 50px;
//     text-align: center;
//     outline: none;


// `
// const QuantityRoot = styled.div`
//     display: flex;
// `
export default function CartItem({ product, quantity, enableAction }) {

    const dispatch = useDispatch()
    const [ loading, setLoading ] = useState(false)
    const img = product?.thumbnail_url;
    // console.log('product.thumbnail_url', product.thumbnail_url)
    const onRemove = (ev) => {
        ev.preventDefault()
        setLoading(true)
        dispatch(removeCartAction({
            id: product.id,
            success: () => {
                message.success(`Xóa sản phẩm ${product.name} thành công!`)
            },
            finally: () => {
                setLoading(false)
            }
        }))
    }

    const updateQuantity = (quantity) => {
        dispatch(addCartAction({
            id: product.id,
            quantity
        }))

    }

    return (
        <>
            <li className="list-group-item">
                <div className="row align-items-center">
                    <div className="col-4">
                        {/* Image */ }
                        <a href="./product.html">
                            <img className="img-fluid" src={ img } alt="..." />
                        </a>
                    </div>
                    <div className="col-8">
                        {/* Title */ }
                        <p className="font-size-sm font-weight-bold mb-6">
                            <a className="text-body" href="./product.html">{ product.name }</a> <br />
                            <span className="text-muted">{ currency(product.real_price) } vnđ</span>
                        </p>
                        {/*Footer */ }
                        <div className="d-flex align-items-center">
                            {/* Select */ }

                            {
                                enableAction && <InputQuantity
                                    onIncrement={ () => updateQuantity(quantity + 1) }
                                    onDecrement={ () => updateQuantity(quantity - 1) }
                                    value={ quantity }

                                />
                            }

                            {/* <QuantityRoot>
                                <ButtonQuantity onClick={ () => updateQuantity(quantity - 1) }>-</ButtonQuantity>
                                <InputQuantity value={ quantity } />
                                <ButtonQuantity onClick={ () => updateQuantity(quantity + 1) }>+</ButtonQuantity>
                            </QuantityRoot> */}



                            {/* Remove */ }
                            {
                                loading ? <Spin /> : <a onClick={ onRemove } className="font-size-xs text-gray-400 ml-auto" href="#!">
                                    <i className="fe fe-x" /> Remove
                                </a>
                            }

                        </div>
                    </div>
                </div>
            </li>
        </>
    )
}
