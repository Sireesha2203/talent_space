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
    <div className='Back'>
      <NavigationBar />
      {sideBarStatus?
      <div className='page-content'>
        <div className='container '>
          <div className='row'>
            <div className='col-12 col-sm-2'>
              <h1>Basic Features</h1>
            </div>
            <div className='col-12 col-sm-8'>
              <Outlet />
            </div>
            <div className='col-12 col-sm-2'>
              <h1>Additional Things</h1>
            </div>
          </div>
        </div>
      </div>:
        <div className='page-content'>
          <div className='container '>             
            <Outlet />              
          </div>
        </div>
      }
      <Footer />
    </div>
    
  )
}

export default RootLayout