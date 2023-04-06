import api from "../config/api"

const cartService = {
    getCart() {
        return api.get('/cart/v2')
    },
    // updateQuantity(id, data) {
    //     return api.put(`/ecommerce/v1/cart/quantity/${id}`, data)
    //     // return api.put(`/ecommerce/v1/cart/quantity/${id}`, { quantity })
    // },
    addProduct(id, quantity) {
        // return api.put(`/cart/v2/${id}`, { quantity: 1 })
        // return api.patch(`/cart/v2/${id}`, { quantity: 1 })
        return api.patch(`/cart/v2/${id}`, quantity)

    },
    removeItem(id) {
        // return api.delete(`/ecommerce/v1/cart/remove-item/${id}`)
        return api.delete(`/cart/v2/${id}`)
    },
    getPromotion(code) {
        // return api.post(`/ecommerce/v1/cart/add-promotion-code`, data)
        return api.get(`/cart/v2/promotion/${code}`)
    },

    changeShippingMethod(shippingMethod) {
        return api.get('/cart/v2/shipping-method', { shippingMethod })
    },

    checkout(data) {
        return api.post('/cart/v2/checkout', data)

    },
    precheckout(data) {
        return api.post('/cart/v2/pre-checkout', data)

    }
}

export default cartService