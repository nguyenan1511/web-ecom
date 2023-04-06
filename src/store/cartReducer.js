import { getToken } from "../core"
import cartService from "../service/cart.service"
import { createThunkAction } from "../utils/createThunkAction"

const initialState = {
    cart: {}
}

const SET_CART = 'cart/setCart'


export const getCartAction = () => {
    return async (dispatch) => {
        try {
            if (getToken()) {
                const cart = await cartService.getCart()
                dispatch({ type: SET_CART, payload: cart.data })
            }
        }
        catch (err) {

        }
    }
}

export const addCartAction = createThunkAction(async (data, dispatch) => {
    const res = await cartService.addProduct(data.id, { quantity: data.quantity })

    if (res.updateCount) {
        dispatch(getCartAction())
    }

})
// export const addCartAction = (data) => {
//     return async (dispatch) => {
//         try {
//             const res = await cartService.addProduct(data.id)

//             if (res.updateCount) {
//                 dispatch(getCartAction())
//                 data?.success()
//             }
//         }
//         catch (err) {
//             data?.error()
//         }
//         finally {
//             data?.finally()
//         }
//     }
// }

export const removeCartAction = createThunkAction(async (data, dispatch) => {
    const res = await cartService.removeItem(data.id)
    if (res.deleteCount) {
        dispatch(getCartAction())
    }
})




export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CART:
            return { ...state, cart: action.payload }
        default:
            return state
    }
}