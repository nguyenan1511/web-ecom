import axios from "axios";
import { getToken, setToken } from "../core";
import authService from "../service/auth.service";
// axios.defaults.baseURL = import.meta.env.VITE_API_HOST

const api = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
})

api.interceptors.request.use((config) => {

    let token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token.accessToken}`
    }

    return config
})

let promiseRefreshToken = null


api.interceptors.response.use((res) => {

    return res.data

}, async (err) => {
    // kiem tra xem co phai loi do token expired
    // refresh token
    // goi lai api bi that bai

    const response = err.response.data


    if (response.error_code === 'TOKEN_EXPIRED') {
        if (promiseRefreshToken) {
            await promiseRefreshToken
        }
        else {
            const token = getToken()
            promiseRefreshToken = authService.refreshToken({ refreshToken: token.refreshToken })
            const accessToken = await promiseRefreshToken
            token.accessToken = accessToken.data.accessToken
            setToken(token)

        }
        promiseRefreshToken = null
        return api(err.config)

    }

    throw err.response.data
})

export default api