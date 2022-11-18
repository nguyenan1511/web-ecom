import React from 'react'
import { updateQuantityCartAction } from '../store/cartReducer'
import styled from 'styled-components';

const ButtonQuantity = styled.button`
    width : 50px;
    height: 38px;
    border: none;
    background: none;
    outline: none;
`
const InputQuantityBox = styled.input`
    width: 50px;
    text-align: center;
    outline: none;
    

`
const QuantityRoot = styled.div`
    display: flex;
`

export default function InputQuantity({ value, onIncrement, onDecrement }) {

    return (
        <>

            <QuantityRoot>
                <ButtonQuantity onClick={ onDecrement }>-</ButtonQuantity>
                <InputQuantityBox value={ value } />
                <ButtonQuantity onClick={ onIncrement }>+</ButtonQuantity>
            </QuantityRoot>
        </>
    )
}
