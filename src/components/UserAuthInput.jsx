import React from 'react'
import { useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import {motion} from "framer-motion"

const UserAuthInput=({label,placeHolder,isPass,setStateFUnction,Icon,setGetEmailValidationStatus})=> {
  const [value,setValue]=useState("");
  const [showPass,setShowPass]=useState(false);
  const [isEmailValid,setIsEmailValid]=useState(false);

        const handleTextChange=(e)=>{
          setValue(e.target.value);
          setStateFUnction(e.target.value);
        isPass=true;
          if(placeHolder=="Email"){
            const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const status=emailRegex.test(value);
            setIsEmailValid(status);
            setGetEmailValidationStatus(status)
          }
        }

  return (
    <div className='flex flex-col items-start justify-start gap-1'>
      <label className='text-lg text-gray-400'>{label}</label>
      <div className={`flex items-center justify-center gap-4 w-full md:w-80 rounded-md py-2 px-5 bg-gray-100 ${isEmailValid && placeHolder==="Email " && value.length>0 && "border-2 border-red-600"}`}>

        <Icon className='text-text555 text-2xl'/>
        <input type={isPass && showPass?'password':'text'}
        placeholder={placeHolder} className='flex-1 w-full h-full py-3 outline-none border-none bg-transparent text-text555 text-lg' value={value} onChange={handleTextChange}/>

        {isPass && (
           <motion.div onClick={()=>setShowPass(!showPass)} whileTap={{scale:0.9}} className='cuser-pointer'>

            {showPass ? (
               <FaEyeSlash className='text-text555 text-2xl'/>
              
               
              ):(<FaEye className='text-text555 text-2xl'/>
            )}
          
           </motion.div>
        )}
        

      </div>
      
    </div>
  )
}

export default UserAuthInput
