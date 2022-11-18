
import React, { createContext, useReducer } from 'react'
  export const store=createContext()
export const Redux = ({children,currentuser}) => { 
  const instialstate={
       chatId:"null",
        user:{}
  } 
  const reducer=(state,action)=>{
      switch(action.type)
      { case "CHA": 
     
      return{ 
        user:action.payload,
     chatId:currentuser.uid>action.payload.uid? currentuser.uid+action.payload.uid:action.payload.uid+currentuser.uid,
      
      }
      default : 
      return state
      }
  }
  const [state,dispatch]=useReducer(reducer,instialstate)
 
  return (
    <div>
      
   <store.Provider value={{data:state,dispatch}}>
   {children}
   </store.Provider>


    </div>
  )
}
