import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const Context = createContext({})

export const TranslateProvider = ({ children, translate, locales = "en" }) => {
    const [ trans, setTrans ] = useState(translate)
    const [ lang, setLang ] = useState(locales)

    const t = (k) => {
        return trans?.[ lang ]?.[ k ] || k
    }

    const selectLocale = (locale) => {
        setLang(locale)
    }

    return (
        <Context.Provider value={ { t, locale: lang, selectLocale } }>{ children }</Context.Provider>
    )
}

export const useTranslate = () => useContext(Context)