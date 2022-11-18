export const path = {
    Home: '/',
    Shop: '/shop',
    Auth: '/auth',
    Account: {
        Profile: '/account',
        Wishlist: '/account/wishlist',
        Address: '/account/address',
        AddressAction: '/account/address/:action/*', //if NEW => obj null || if EDIT => obj must have id to edit
        MyOrder: '/account/order',
        MyOrderDetail: '/account/order/:id'
    },
    ViewCart: '/view-cart',
    Checkout: '/checkout',
    OrderCompleted: '/order-completed/:id',
}