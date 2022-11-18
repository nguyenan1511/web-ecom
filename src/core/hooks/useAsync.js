import { useEffect, useState } from "react"

export const useAsync = (promise, immediate = false) => {
    const [ error, setError ] = useState()
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        if (immediate)
            execute()
    }, [])

    const execute = async (...rest) => {
        try {
            setLoading(true)
            setError('')
            const res = await promise(...rest)
            return res
        }
        catch (err) {
            setError(err.message || err.error)
            throw err
        }
        finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        execute
    }
}