
import {Link} from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const Header = () => {

  const { isLoggedIn, isInSignIn } = useAppContext(); 
  const [isOpen, setOpen] = useState(false);

  const toggleDropdown = () =>{
    setOpen(!isOpen);  
  } 

  return (
    <div className='bg-[#66fcf2] text-[#3e3e3e] py-6'>
    <div className='container mx-auto flex justify-between'>
        <span className='text-3xl font-bold tracking-tight'>
            <Link to={"/"}>Best<span className='text-[#ff2d2d]'>Booking</span></Link>
        </span>

        {/* desktop nav */}
        <span className='sm:flex hidden ml-16 text-[15px] space-x-4 items-center'>
          {isLoggedIn ? <>
            <Link className='flex w-[7rem] justify-center font-bold hover:scale-90 duration-700' to={"/my-bookings"}>My Bookings</Link>
            <Link className='flex w-[7rem] justify-center font-bold hover:scale-90 duration-700' to={"/my-hotels"}>My Hotels</Link>
            <SignOutButton />
          </> 
          : 
            isInSignIn(false) === false ?
              <Link to={"/sign-in"} className='flex items-center text-[#3e3e3e] p-2 font-bold bg-[#bbeeff] hover:scale-90 rounded-xl duration-700'>Sign In</Link>
            : <></>
        }
        </span>
        
        {/* mobile nav */}
        <span className='sm:hidden flex space-x-2 items-center'>
          <FaBars className='text-[#ededed] w-10 h-8' onClick={toggleDropdown} />
          <div className={`absolute px-3 py-5 space-y-4 bg-[#9ca4a4] rounded-lg top-16 right-8 z-50 ${!isOpen && "hidden"}`}>
            {isLoggedIn ? <>
              <Link className='flex items-center px-3 font-bold hover:scale-90 duration-700' onClick={toggleDropdown} to={"/my-bookings"}>My Bookings</Link>
              <Link className='flex items-center px-3 font-bold hover:scale-90 duration-700' onClick={toggleDropdown} to={"/my-hotels"}>My Hotels</Link>
              <SignOutButton />
            </> 
            : 
              isInSignIn(false) === false ?
                <Link to={"/sign-in"} onClick={toggleDropdown} className='flex items-center text-[#3e3e3e] p-2 font-bold bg-[#bbeeff] hover:scale-90 rounded-xl duration-700'>Sign In</Link>
              : <></>
           }
          </div>
        </span>
    </div>
    </div>
  )
}

export default Header
