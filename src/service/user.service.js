import api from "../config/api";

const userService = {
    getUser() {
        return api.get('/users')
    },
    updateInfo(data) {
        return api.patch('/users/update', data)
    },
    changePassword(data) {
        return api.post('/users/change-password', data)
    }
}

export default userService
