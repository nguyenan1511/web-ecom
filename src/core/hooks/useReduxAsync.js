import { useState } from "react"

export const useReduxAsync = (funcAction) => {
    const [ error, setError ] = useState()
    const [ loading, setLoading ] = useState(false)



    const action = (data) => {

        setLoading(true)
        return funcAction({
            form: data,
            success: () => {
                setLoading(false)
            },
            error: () => {
                setLoading(false)
                setError(err.message || err.error)
            }
        })

    }

    return (
        error,
        loading,
        action
    )
}