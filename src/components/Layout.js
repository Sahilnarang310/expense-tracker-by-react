import React from 'react'
import LoginForm from '../pages/LoginForm'
import Header from './Header'
import { useAuth } from '../store/auth-context'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const authCtx=useAuth();

  return (
    <div>
        <Header/>
        <Outlet/>
        {/* <footer>footer</footer> */}
    </div>
  )
}

export default Layout