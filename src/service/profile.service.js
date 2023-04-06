import api from "../config/api"

const profileService = {
    getWishlist(query = '') {
        return api.get('/product/wishlist' + query)
    },
    addWishlist(id) {
        return api.post(`/product/wishlist/${id}`)
    },
    removeWishlist(id) {
        return api.delete(`/product/wishlist/${id}`)
    },

    getAddress(id) {
        // return api.get(`/ecommerce/v1/profile/address${id ? `/${id}` : ''}`)
        return api.get(`/users/address/${id ? `${id}` : ''}`)
    },
    getAddressDefault() {
        return api.get('/users/address')
    },
    addAddress(data) {
        return api.post('/users/address', data)
    },
    deleteAddress(id) {
        return api.delete(`/users/address/${id}`)
    },
    editAddress(id, data) {
        return api.patch(`/users/address/${id}`, data)
    }

}

export default profileService