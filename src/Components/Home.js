import React,{useState,useEffect} from 'react'
import { Chat } from './Chat'
import { Sidebar } from './Sidebar'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { Redux } from './Redux';
import { Children1 } from './Children1'
export const Home = ({change}) => {  

  const [currentuser,setcurretuser]=useState({}); 
        useEffect(()=>{
        const unsub= onAuthStateChanged(auth,(user)=>{

      setcurretuser(user); 
      console.log(user )

         }); 
         return ()=>{
          unsub()
         }
        
        
        
},[]) ;
  return (
    <div className='home'>
        <div className='container flex '> 
        <Children1 currentuser={currentuser}> 
          
           <Sidebar change={change} currentuser={currentuser}/>
           <Chat currentuser={currentuser}/>
         </Children1>
    
         </div>
    </div>
  )
}
