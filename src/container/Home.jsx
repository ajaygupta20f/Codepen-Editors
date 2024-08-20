import React from 'react'
import {useState} from 'react'
import { HiChevronDoubleLeft } from 'react-icons/hi2';
import {motion} from "framer-motion"
import { Logo } from '../assests';
import {Link} from "react-router-dom"
import { MdHome} from 'react-icons/md';
import { FaSearchengin} from 'react-icons/fa';
import { Router,Route,Routes } from 'react-router-dom';
import Signup from './Signup';
import Projects from './Projects';
import { useSelector,useDispatch } from 'react-redux';
import { UserProfileDetails } from '../components';
import {SET_SEARCH_TERM} from  "../context/actions/searchAction"

const Home=()=> {
  const[isSideMenu, setIsSideMenu]=useState(false);
  const user=useSelector((state)=>state.user?.user);
  const dispatch=useDispatch();
  const  searchTerm=useSelector((state)=>state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm :"");
  return (
    <>
    <div className={`w-2${isSideMenu ? "w-0":"flex-[.2] xl:flex-[.4]"} min-h-screen relative max-h-screen  bg-secondary px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all direction-200 ease-in-out`}>

      {/* anchor section */}
      <motion.div whileTap={{scale:0.8}} onClick={()=>setIsSideMenu(!isSideMenu)} className='w-5 h-5 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer' >
        <HiChevronDoubleLeft className='text-white text small'/>
      </motion.div>

<div className='overflow-hidden w-full flex flex-col gap-4'>
      
      {/* logo*/}
      <Link to={"/home"}>
      <img src={Logo} alt="logo" className='object-contain w-72 h-auto' />
      </Link>

     {/* Start coding section */}

     <Link to={"/newProject"}>
     <div className='px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 curser-pointer group hover:border-gray-200'>
      <p className='text-gray-400 group-hover:text-gray-200 capitalize'>
        Start Coding
      </p>
     </div>
     </Link>

    {/* home nav */}

    {user && (
      <Link to={"/home/projects"} className='flex items-center gap-6' >
        <MdHome className="text-primaryText text-xl"/>
        <p className='text-lg text-primaryText'>Home</p>
      </Link>
    )
    }
     </div>
      </div>


      {/* mainpart homepage */}


<div className='flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-15 py-3 md:py-12' >

  {/* top section */}
  <div className='w-full flex items-center justify-between gap-4'> 

    {/* search */}

    <div className='bg-secondary w-full px-4 py-3 rounded-md flex items-center justify-center gap-4'>
      <FaSearchengin className='text-2xl text-primaryText'/>
      <input type='text' 
      value={searchTerm}
      className='flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600'placeholder="Search here...."

      onChange={(e)=> dispatch(SET_SEARCH_TERM(e.target.value))}
      
      />
    </div>

    {/* Profile Section */}

    {!user && (
      <motion.div whileTap={{scale:0.9}} className='flex items-center justify-center gap-3'>
        <Link to={"/home/auth"} className='bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-600 '>
       
        SignUp
        </Link>
      </motion.div>
    )

    }

    {user && <UserProfileDetails/>}

  </div>
  <div className='w-full'>
    <Routes>
      <Route path="/*" element={<Projects/>}/>
      <Route path="/auth" element={<Signup/>}/>
    </Routes>

  </div>

</div>
    </>
  )
}

export default Home
