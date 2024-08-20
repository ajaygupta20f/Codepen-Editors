import React from 'react'
import {useState} from 'react'
import { Logo } from '../assests';
import { UserAuthInput } from '../components';
import { FaEnvelope } from 'react-icons/fa';
import { MdPassword } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa6';
import {motion,AnimatePresence} from "framer-motion"
// import { signInWithGoogle } from '../utils/helpers';
import { auth } from '../config/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { fadeInOut } from '../animations/index';
import { signInWithEmailAndPassword } from 'firebase/auth'
// import { signInWithGitHub, signInWithGoogle } from '../utils/helpers'

const Signup=()=> {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
 const [getEmailValidationStatus,setGetEmailValidationStatus]=useState(false);
const [isLogin ,setIsLogin]=useState(false);
const [alert, setAlert] = useState(false)
const [alertMessage, setAlertMessage] = useState("")

const craeteNewUser=async ( )=>{
  if(getEmailValidationStatus){
   createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
     console.log(userCredential);
     
   })
   .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     console.log(errorCode,errorMessage)
   });
  }
}

const  loginwithemailpassword=async ( )=>{
  if(getEmailValidationStatus){
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
   if(userCredential){
     console.log(userCredential);
   }
  })
  .catch((error) => {
   
    console.log(error.message);
    if(error.message.includes("invalid-credential")){
       setAlert(true);
       setAlertMessage("Invalid Id:User Not Found");
    } else if(error.message.includes("invalid-credential")){
       setAlert(true);
       setAlertMessage("Password Mismatch");
    } else{
      setAlert(true);
      setAlertMessage("Temporarily disable due to many failed login");
    }
    setInterval(()=>{
       setAlert(false);
    },4000)
  });

  }
}


  return (
    <div className='w-full py-7'>
      <img src={Logo} className='object contain w-32 opacity-50 h-auto' alt="" />
    <div className='w-full flex flex-col items-center justify-center py-8'>
      <p  className='py-13 text-2xl text-primaryText'>Join With Us!</p>
      <div className='px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8'>

        {/* mail */}

        <UserAuthInput label="Email" placeHolder="Email" isPass={false} key="Email" setStateFUnction={setEmail} Icon={FaEnvelope}
        setGetEmailValidationStatus={setGetEmailValidationStatus}
        />
        

        {/* password */}

        <UserAuthInput label="Pasword" placeHolder="Password" isPass={true} key="password" setStateFUnction={setPassword} Icon={MdPassword}/>

        {/* alert section */}

        <AnimatePresence>
           {
            alert && (
                
      <motion.div 
      key={"AlertMessage"}
      {...fadeInOut}
      className='text-red-500'
      
      >
         {alertMessage}
      </motion.div>
            )
           }
        </AnimatePresence>

        {/* Login Button */}

      {!isLogin ?(
          <motion.div
          onClick={craeteNewUser} 
          whileTap={{scale:0.9}} className='flex items-center justify-center w-full py-3
          rounded-xl hover:bg-emerald-500 cursor-pointer bg-emerald-600 '>
          
           <p className='text-xl text-white'>Sign Up</p>
          
             </motion.div>
      ):(
        <motion.div
        onClick={loginwithemailpassword}
        whileTap={{scale:0.9}} className='flex items-center justify-center w-full py-3
        rounded-xl hover:bg-emerald-500 cursor-pointer bg-emerald-600 '>
        
         <p className='text-xl text-white'>Login</p>
        
           </motion.div>
      )


      }

       {/* Account Text section */}

         {!isLogin ?(
           <p className='text-xl text-primaryText flex items-center justify-center gap-4'>Already Have an Account !{" "}
           <span 
           onClick={()=>setIsLogin(!isLogin)}className='text-emerald-500 cursor-pointer'> Login Here</span>
           </p>
 
         ):(
          <p className='text-xl text-primaryText flex items-center justify-center gap-4'>Doesn't Have An Account !{" "}
          <span onClick={()=>setIsLogin(!isLogin)}
          className='text-emerald-500 cursor-pointer'> Create Here</span>
          </p>

         )}
       

           {/* or section */}
           {/* <div className='flex items-center justify-center gap-12'>
             <div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24 '></div>
             <p className='text-sm text-[rgba(256,256,256,0.2)] '>OR</p>
             <div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24 '></div>
          </div> */}

       {/* sign in with google */}


        {/* <motion.div  
        onClick={signInWithGoogle}  
         whileTap={{scale:0.9}} className='  bg-[rgba(256,256,256,0.2)] w-full flex items-center justify-center gap-3 backdrop-blur-md py-3 rounded-xl hover: bg-[rgba(256,256,256,0.4)] cursor-pointer'> 
          <FcGoogle  className='text-3xl'/>
          <p className='text-xl text-white'>Sign in with Google</p>
        </motion.div>  */}

         {/* sign in with ngithub */}


       {/* <motion.div  onClick={signInWithGitHub} whileTap={{scale:0.9}} className='  bg-[rgba(256,256,256,0.2)] w-full flex items-center justify-center gap-3 backdrop-blur-md py-3 rounded-xl hover: bg-[rgba(256,256,256,0.4)] cursor-pointer'> 
          <FaGithub  className='text-3xl'/>
          <p className='text-xl text-white'>Sign in with GitHub</p>
        </motion.div> */}

        </div>

    </div>
    </div>
  )
}

export default Signup


