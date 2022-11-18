import api from "../config/api";

const orderService = {
    getOrderDetail(id) {
        return api.get(`/ecommerce/v1/order/${id}`)
    }
}

export default orderService
