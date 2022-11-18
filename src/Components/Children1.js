import React from 'react'
import { Redux } from './Redux'
export const Children1 = ({children,currentuser}) => {
  return (
    <div> 
         <Redux  currentuser={currentuser}>
        {children}
         </Redux> 
     </div>
  )
}
