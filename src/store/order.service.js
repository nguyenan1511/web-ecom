import api from "../config/api";

const orderService = {
    getOrderDetail(id) {
        return api.get(`/ecommerce/v1/order/${id}`)
    },

    getList(query = '') {
        return api.get(`/ecommerce/v1/order${query}`)
    }
}

export default orderService
