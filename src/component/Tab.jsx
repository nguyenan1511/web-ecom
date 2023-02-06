import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Children } from "react";
import { createContext } from "react";
import { cn } from "../core";

const Context = createContext({})

export const Tab = ({ children }) => {
    const [ indexActive, setIndexActive ] = useState(0)
    return (
        <Context.Provider value={ { indexActive, setIndexActive } }>{ children }</Context.Provider>
    )
}

const useTab = () => useContext(Context)

Tab.Title = ({ children, index }) => {
    const { indexActive, setIndexActive } = useTab()
    const onClick = (ev) => {
        ev.preventDefault()
        setIndexActive(index)
    }
    return (
        <a onClick={ onClick } className={ cn("nav-link ", { active: indexActive === index }) } data-toggle="tab" href="#descriptionTab">
            { children }
        </a>
    )
}

Tab.Content = ({ children, index }) => {
    const { indexActive } = useTab()
    const ref = useRef()
    useEffect(() => {
        setTimeout(() => {
            if (index === indexActive) {
                ref.current.classList.add('show')

            }
        }, 100)
    }, [ index === indexActive ])
    return (
        <div ref={ ref } className={ cn("tab-pane ", { 'fade active': index === indexActive }) } >
            { children }
        </div>
    )
}