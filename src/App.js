
import './App.css';

import { Home } from './Components/Home';
import { Signin } from './Components/Signin';
import { Register } from './Components/Register';
import {  useState } from 'react';

function App() { 
   
  const [route,setroute]=useState('sign')  



  const change=(rout)=>{
   
    setroute(rout)



  }
    
 
     


  
  



  return ( 
    <div className='cont  '>
    
     { route==='home'?  <Home change={change}/> : 
     <div>
       { route==="register"?  <Register setroute={setroute} change={change}/> : <Signin change={change}/>
     
       } 
     
      </div>
      } 
 
 
  

    </div>
  );
}

export default App;
