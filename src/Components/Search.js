

import { collection,where,query, getDoc,getDocs,setDoc,doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../firebase' 
import { Chats } from './Chats'
export const Search = ({currentuser}) => { 
  const [username,setusername]=useState("")
  const [user,setuser]=useState(null)
  const [error,seterror]=useState(null)  
  const handlesearch = async ()=>{  

    const qu =query(collection(db,'users'),where("displayName","==",username))
     
   try{const querySnapshot=await getDocs(qu)
   querySnapshot.forEach(doc => {
    
    setuser(doc.data())
   });}
   catch(err){ 
seterror(true)
   }



}
  
  const handle=(e)=>{
  e.code==="Enter" && handlesearch();
  }  

  const handlechats = async()=>{ 
    const combinedId =currentuser.uid>user.uid?currentuser.uid+user.uid:user.uid+currentuser.uid;
      
    try{  
    const res=await getDoc(doc(db,"chats",combinedId) )
    if(!res.exists())
    {  
        await setDoc(doc(db, "chats", combinedId), {messages:[] });
        await updateDoc(doc(db,"userschat",currentuser.uid),{ 
           [combinedId+".userInfo"]:{
            
           uid:user.uid,
          displayName:user.displayName,
          photoURL:user.photoURL

           },
           [combinedId+".date"]:serverTimestamp(),
     

        })  
        await updateDoc(doc(db, "userschat", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentuser.uid,
            displayName: currentuser.displayName,
            photoURL: currentuser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      
        
    }

    }
    catch(err){ 
        console.log(err)
    
    } 
   setuser(null)
   setusername("")
    }


  return (
    <div style={{overflowY:"scroll", height:"538px"}}> 
    <div className='w-57 h-0.5 bg-black'></div> 
    {error && <span>user not found</span>}
    <div className=' search mr-2' >
    
     <input type='text' className='mt-1 ml-2 rounded-md w-72 pl-2' onKeyDown={handle} onChange={(e)=>{setusername(e.target.value)}}  value={username} placeholder='search user' />
    </div>
    { user && <div onClick={handlechats} className='userchat flex ml-2 mt-3  bg-green-800 h-10 w-72 rounded-md space-x-2 cursor-pointer hover:bg-slate-400 '>
     <img  className=" w-7 rounded-full h-7 mt-1  ml-3 "  src={user.photoURL} alt='noimage'/>
  
     <span className='ml-4 mt-1 '>{user.displayName}</span>

 </div>}   
 <div><Chats currentuser={currentuser}/></div>
 
 

    </div>
  )
}
