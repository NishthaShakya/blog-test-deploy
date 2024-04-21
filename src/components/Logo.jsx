import React from 'react'
import MyLogo from '../assets/images/MyLogo.png'
function Logo({width = '100px'}) {
  return (
    <div>
      <img className= "bg-transparent" src= {MyLogo} alt="logo" style={{ width: width }}/>
    </div>
  )
}

export default Logo