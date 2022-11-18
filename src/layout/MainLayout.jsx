import React from 'react'
import { Outlet } from 'react-router-dom'
import CartDrawer from '../component/CartDrawer'
import Footer from '../component/Footer'
import Header from '../component/Header'
import SearchDrawer from '../component/SearchDrawer'

export default function MainLayout() {
  return (
    <>
      <Header />
      <SearchDrawer />
      <CartDrawer />
      <Outlet />
      <Footer />
    </>
  )
}
