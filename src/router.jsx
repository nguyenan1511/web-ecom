import { lazy } from "react";
import { path } from "./config/path";
import MainLayout from "./layout/MainLayout";
import ProfileLayout from "./layout/ProfileLayout";
import Page404NotFound from "./pages/404"
import Profile from "./pages/account";
// import Address from "./pages/account/address";
// import Wishlist from "./pages/account/wishlist";

const Home = lazy(() => import('./pages/index'))
const Shop = lazy(() => import('./pages/shop'))
const Auth = lazy(() => import('./pages/auth'))
const Wishlist = lazy(() => import('./pages/account/wishlist'))
const Address = lazy(() => import('./pages/account/address/index'))
const AddressAction = lazy(() => import('./pages/account/address/[action][id]'))
const MyOrder = lazy(() => import('./pages/account/order'))
const ViewCart = lazy(() => import('./pages/view-cart'))
const Checkout = lazy(() => import('./pages/checkout'))
const OrderCompleted = lazy(() => import('./pages/OrderCompleted'))
const ProductDetail = lazy(() => import('./pages/product/[slug]'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Contact = lazy(() => import('./pages/contact'))

const routers = [
    {
        element: <MainLayout />,
        path: '/',
        children: [
            {
                index: true, element: <Home />
            },

            {
                path: path.Shop, element: <Shop />
            },

            {
                path: path.Auth, element: <Auth />
            },

            {
                path: path.ViewCart, element: <ViewCart />
            },

            {
                path: path.Checkout, element: <Checkout />
            },

            {
                path: path.OrderCompleted, element: <OrderCompleted />
            },

            {
                path: path.ProductDetail, element: <ProductDetail />
            },

            {
                path: path.FAQ, element: <FAQ />
            },

            {
                path: path.Contact, element: <Contact />

            },

            {
                path: path.Account.Profile, element: <ProfileLayout />,
                children: [
                    {
                        index: true, element: <Profile />
                    },

                    {
                        path: path.Account.Wishlist, element: <Wishlist />
                    },

                    {
                        path: path.Account.Address, element: <Address />
                    },

                    {
                        path: path.Account.AddressAction, element: <AddressAction />
                    },

                    {
                        path: path.Account.MyOrder, element: <MyOrder />
                    },
                ]
            },

            {
                path: '*', element: <Page404NotFound />
            },
        ]
    }
]

export default routers