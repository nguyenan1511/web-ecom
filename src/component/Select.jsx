import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'

export default function Select({ options, onChange, defaultValue }) {
    const [ select, setSelect ] = useState(() => {
        return options.find(e => e.value === defaultValue) || {}
    })

    const ref = useRef()

    const onMouseEnter = () => {
        ref.current.classList.add('show')
    }

    const onMouseLeave = () => {
        ref.current.classList.remove('show')
    }

    const onSelect = (select) => (ev) => {
        ev.preventDefault()
        setSelect(select)
        onChange?.(select.value)
    }

    return (
        <div ref={ ref } onMouseEnter={ onMouseEnter } onMouseLeave={ onMouseLeave } className='dropdown hovered'>
            <a className="nav-link dropdown-toggle" data-toggle="dropdown">{ select.label }</a>
            {/* Menu */ }
            <div className="dropdown-menu minw-0">
                {
                    options.map(e => <a onClick={ onSelect(e) } key={ e.value } className="dropdown-item">{ e.label }</a>)
                }

            </div>
        </div>
    )
}
