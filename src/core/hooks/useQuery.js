import { useState, useEffect } from "react"


export const useQuery = (callbackPromise, dependenciesList = []) => {
    const [ data, setData ] = useState()
    const [ paginate, setPaginate ] = useState({})
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState('')


    //tao state de giu data khi goi api ve

    useEffect(() => {
        // fetch(`http://cfd-reactjs.herokuapp.com/elearning/v4/courses`)
        //     .then(res => res.json())
        //     .then(res => {
        //         setCourse(res.data)
        //     })

        // api.get(`/elearning/v4/courses`)
        //     // .then(res => setCourse(res.data.data)) 
        //     // data 1 la cua axios, data 2 la cua link url
        //     .then(res => setCourse(res.data))
        // // bo duoc 1 data vi chung ta su dung interceptor cua axios 
        // setLoad(true)
        execute()
    }, dependenciesList)

    const execute = () => {
        setLoading(true)
        callbackPromise()
            .then(res => {

                setData(res.data)
                setPaginate(res.paginate || {})
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return {
        data, loading, error, paginate, execute

        // return + {} , not ()
    }
}
