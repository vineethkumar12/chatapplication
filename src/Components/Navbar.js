import React from 'react'
import { signOut } from 'firebase/auth' 
import { auth } from '../firebase' 

export const Navbar = ({change,currentuser}) => {  
  
  


  const logout=()=>{
    change('sign')
    signOut(auth) 
  }
  return (
    <div className='navbar h-14 bg-gradient-to-r from-yellow-500 via-pink-800 to-cyan-700'>
     <span> Chat</span>
       <div className='user flex space-x-3 mr-1'>
       <img className=' rounded-full w-9 h-10 ' src={currentuser.photoURL} alt="m" />
          <span>{currentuser.displayName} </span> 
          <button onClick={logout} className=' bg-black text-white  px-1 rounded-md  h-6 '>logout</button>
       </div>
      
        
        </div>
  )
}
