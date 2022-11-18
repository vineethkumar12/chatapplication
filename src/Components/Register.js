import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from 'react' 
 import { auth} from "../firebase";  
 import { db} from "../firebase";
 import { doc, setDoc } from "firebase/firestore"; 
 import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";




    export const Register = ({change}) => {   
     
        const [error,seterror]=useState(false)
        const [open,setopen]=useState(false)
   const  form = async(e)=>{ 
    setopen(true)
     e.preventDefault();
   const displayName=e.target[0].value
   const email=e.target[1].value
   const password=e.target[2].value
   const file=e.target[3].files[0]

    try {
  
    const res=  await createUserWithEmailAndPassword(auth, email, password,displayName)
       
   
   
    const storageRef = ref(storage,displayName);
    
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on(

      
      (error) => { 
       
        seterror(true)
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
         await updateProfile(res.user,{
        displayName,
        photoURL:downloadURL

         });
         await setDoc(doc(db, "users", res.user.uid), {
             uid:res.user.uid,
            displayName,
            email,
             
               photoURL:downloadURL
       
           });  
          
            change("home")

           await setDoc(doc(db, "userschat", res.user.uid), { });
          

        }); 
       

      }
    );
    
    // Add a new document in collection "cities"
    
    
  



    } 



    
    catch(err){ 
        console.log(err) 
        seterror(true)
        setopen(false)
    }


    
   }






    return (
        <div className='formcont sign bg-orange-200  '>
 
        <form className=' space-y-2 bg-sky-500  rounded-md  h-80  w-80' onSubmit={form}>
        <h1 className="bg-white rounded-md mt-3"> Register</h1>

        <div className=" mt-16"> 
        <label>Name: </label>
        <input type="text"className='p-1 ml-2 mt-4  rounded-md' placeholder='text' />
        </div>
        <div>
        <label>email: </label>
        <input id="vi" className='p-1   rounded-md' type="email" placeholder='email' /> 
        </div>
        <div>
        <label>password:</label>
        <input type="password" className='p-1 mr-6  rounded-md' placeholder='pass'/>

        </div> 
        <div>
        <input type="file"id="vhi" style={{display:"none"}} /> 
        <label htmlFor="vhi">
       <span className="-ml-36 ">choose image :</span>  <i className="fa-solid fa-image cursor-pointer ml-3 text-lg" ></i>  
        
        </label>
        
        </div>
        <button className='bg-black text-white p-0.5   px-1 rounded-md '>sign up</button> 
        { error && <h1> something went wrong</h1>

        } { open && <h1>please wait its opening</h1>

      }
        </form>
    </div>

      
    )
    }
