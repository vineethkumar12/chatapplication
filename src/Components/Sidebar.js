import React from 'react'

import { Navbar } from './Navbar'

import { Search } from './Search'

export const Sidebar = ({change,currentuser}) => {
  return (
    <div className=' w-80 rounded-tl-md bg-gradient-to-r from-yellow-500 via-pink-800 to-cyan-700  fixed   ' >
   

     <Navbar change={change} currentuser={currentuser}/> 
     <Search currentuser={currentuser} /> 
   
    </div>
  )
}
