import React,{useContext} from 'react'
import Footer from '../components/Footer/Footer'
import NavigationBar from '../components/Navbar/NavigationBar'
import {Outlet} from 'react-router-dom'
import { webContext } from '../contexts/webContext'
function RootLayout() {
  
  const [
    sideBarStatus,
    changeSideBarStatus
    ] = useContext(webContext);
  changeSideBarStatus(false)
  return (
    <div>
      <NavigationBar />
      <div style={{minHeight:"100vh"}}>
        {sideBarStatus?
        <div className='d-flex flex-wrap'>
          <div className='col-12 col-sm-2'>
            <h1>Basic Features</h1>
          </div>
          <div className='col-12 col-sm-8'>
            <Outlet />
          </div>
          <div className='col-12 col-sm-2'>
            <h1>Additional Things</h1>
          </div>
        </div>:
        <div>
            <Outlet />
        </div>}
      </div>
      <Footer />
    </div>
    
  )
}

export default RootLayout