import React, { useContext,useEffect,useState } from 'react'
import { Message } from './Message'
import { store } from './Redux'
import { onSnapshot,doc } from 'firebase/firestore'
import { db } from '../firebase'
export const Messages = ({currentuser}) => { 

  const [messages,setmessages]=useState([]) 
  const {data}=useContext(store)
  useEffect(()=>{

        const unsub =onSnapshot(doc(db,'chats',data.chatId),(doc)=>{
          doc.exists() && setmessages(doc.data().messages)
        }) 
        return ()=>{
         unsub();
       }
    
    },[data.chatId] ) 
    console.log(messages)
  return (
    <div className='messages' style={{overflowY:"scroll", height:"475px"}}> 
      {  messages.map((m)=>{ 
        return(
         <Message message={m} currentuser={currentuser}/>
         )
      })
       
        }</div>
  )
}

