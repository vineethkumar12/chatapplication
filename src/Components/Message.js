import React ,{useContext, useEffect, useRef}from 'react'
import { store } from './Redux'
export const Message = ({message,currentuser}) => { 
   
  const {data}=useContext(store)
     const ref=useRef()
     useEffect(()=>{ 
      ref.current?.scrollIntoView({behavior:"smooth"})

     },[message])

 console.log(message.date)

  return (
    <div ref={ref} className={` flex flex-col mb-2 mr-4 } `} > 
      <div className={`flex   ${message.senderId === currentuser.uid && "flex-row-reverse "}  `}> 
        <div className=''>  
            <img  className= " w-7 rounded-md mr-2  " src={message.senderId === currentuser.uid?currentuser.photoURL:data.user.photoURL} alt="noimage" />
             <span>{}</span> 
        </div>
        <div className={`space-y-2 mr-2  `}> 

         <p className={`bg-gradient-to-r from-yellow-500 via-blue-300 to-red-700  p-3 rounded-l-xl  rounded-br-xl ${message.senderId !== currentuser.uid && "rounded-r-xl  rounded-bl-xl  rounded-l-none bg-gradient-to-r from-green-500 via-green-600 to-green-700   "}`}>{message.text}</p> 
         
        {message.img&& <img  className={` w-44  rounded-md mr-24   ${message.senderId !== currentuser.uid && "ml-24 rounded-md "} `} src={message.img} alt="noimage" />}
          
        </div>
      </div>
      
    </div>
  )
}
