import { useSearchParams } from "react-router-dom"

export const useSearch = (name, defaultValue) => {
    const [ searchParams ] = useSearchParams()
    return searchParams.get(name) || defaultValue

}