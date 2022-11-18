import React from 'react'
import { Messages } from './Messages' 
import { Chatbar } from './Chatbar'
import { Input} from './Input'
export const Chat = ({currentuser}) => { 
  
  return (
    <div className='ml-80 ' >
       <Chatbar />
       <Messages currentuser={currentuser} /> 
      <Input currentuser={currentuser} /> 
       
          
    </div>
  )
}
