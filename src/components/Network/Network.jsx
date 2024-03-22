import React,{useContext} from 'react'
import { webContext } from '../../contexts/webContext'

function Network() {
  let [sideBarStatus,changeSideBarStatus]=useContext(webContext);
  changeSideBarStatus(true);
  return (
    <div>Network</div>
  )
}

export default Network