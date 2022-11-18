import React, { useId } from 'react'
import styled from 'styled-components'

const ErrorText = styled.p`
    color: red
`

export default function Input({ error, label, type = 'text', ...props }) {
    const id = useId()
    return (
        <div className="form-group">
            <label htmlFor={ id }>
                { label }
            </label>
            <input { ...props } className="form-control form-control-sm" id={ id } type={ type } />
            { error && <ErrorText>{ error }</ErrorText> }
        </div>
    )
}
