import React,{useContext} from 'react'
import Footer from '../components/Footer/Footer'
import NavigationBar from '../components/Navbar/NavigationBar'
import {Outlet} from 'react-router-dom'
import { webContext } from '../contexts/webContext'
import Sidebar from './Sidebar'
import './RootLayout.css'
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
              <Sidebar/>
            </div>
            <div className='col-12 col-sm-10'>
              <Outlet />
            </div>
            
          </div>
        </div>
      </div>:
        <div className='page-content'>
          <div className='container '>    
            <div className="row">
              <div className="col-12"><Outlet /> </div>
            </div>                  
          </div>
        </div>
      }
      <Footer />
    </div>
    
  )
}

export default RootLayout