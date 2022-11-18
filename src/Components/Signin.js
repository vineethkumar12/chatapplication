import React,{useState} from 'react' 
import { auth} from "../firebase";  
import { signInWithEmailAndPassword } from "firebase/auth";


export const Signin = ({change}) => {  
  const [error,seterror]=useState(false)

  const  form = async(e)=>{
    e.preventDefault();

  const email=e.target[0].value
  const password=e.target[1].value


   try {  
    await signInWithEmailAndPassword(auth, email, password)
 
    change("home")
   
  
   }
   
   catch(err){ 
       console.log(err) 
       seterror(true)

   }


 


  }

  
 // 
  return (
    <div className='sign bg-orange-200  '>
 
    <form className=' space-y-2 bg-sky-500  rounded-md  h-80  w-80' onSubmit={form}>
       <div><h1 className="bg-white rounded-md mt-3 "> Sign in </h1>
      </div>
           <div>
    <label>email: </label>
    <input id="vi" className='p-1  mt-1o m-6  rounded-md' type="email" placeholder='email' /> 
    </div>
    <div>
    <label>password:</label>
    <input type="password" className='p-1 mr-6  rounded-md' placeholder='pass'/>

    </div> 
      <div>
    <button className='bg-black text-white p-0.5 mt-4  px-1 rounded-md '>Log in</button> 
    </div> 
    <p className="bg-white rounded-md mt-3 cursor-pointer p-3" onClick={()=>{change("register")}}> you don't hava an acccout?<span className="underline"> Register</span> </p>
    { error && <h1> something went wrong</h1>

}
    </form>
</div>
  )
}
