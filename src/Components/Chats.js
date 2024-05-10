import { onSnapshot,doc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase' 
import { store } from './Redux'

export const Chats = ({currentuser}) => {  
 
     const {dispatch}=useContext(store)
    const [chats,setchats]=useState([])
     useEffect(()=>{
       const getChat=()=>{
           const unsub =onSnapshot(doc(db,'userschat',currentuser.uid),(doc)=>{
            setchats(doc.data())
           }) 
           return ()=>{
            unsub();
          }
       
       } 
        
    currentuser.uid && getChat()
    
    },[currentuser.uid])  
    const handle=(u)=>{
   dispatch({type:"CHA",payload: u})  
     }


  return (
    <div> 

     { Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat,i)=>{ 
        return( 

        <div key={chat[0]}  onClick={()=>{handle(chat[1].userInfo)}} className={`userchat flex ml-2 mt-3  bg-white hover:bg-green-500  h-12 w-72 rounded-md space-x-2 cursor-pointer `}>
        <img  className=" w-7 rounded-full h-7 mt-1  ml-3 "  src={chat[1].userInfo.photoURL} alt='no'/>
        
          <div className='flex flex-col'>
        <span className='ml-4  '>{chat[1].userInfo.displayName}</span>
       
      <p className='-mt-1 ml-2 text-fuchsia-800'>{chat[1].lastmessage?.text}</p> 
      </div> 
      
    </div>
           
        )  
       
  
     }) 
     }

    </div>
  )
}
