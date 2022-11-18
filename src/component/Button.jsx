import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const IconStyle = styled.span`
    display: flex;
    margin-right: 10px;
`
const ButtonRoot = styled.button`
    display: flex;
    align-items: center;

    &:disabled {
        cursor: no-drop;
    }
`

export default function Button({ children, loading, ...props }) {
    return (
        <ButtonRoot { ...props } disabled={ loading } className="btn btn-sm btn-dark" type="submit">
            {
                loading && <IconStyle>
                    <LoadingOutlined />
                </IconStyle>
            }
            { children }
        </ButtonRoot>
    )
}
