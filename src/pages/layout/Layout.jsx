import React from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import PermanentDrawerLeft from '../navbar/NavbarLeft'

const Layout = () => {
    return (
        <>
        <Navbar />
       
        <div style={{ marginLeft: '200px', marginTop:'64px' }}>
          <Outlet />
        </div>
      </>
  
    )
}

export default Layout