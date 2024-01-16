
import {Link} from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';

const Header = () => {

  const { isLoggedIn } = useAppContext();

  return (
    <div className='bg-[#66fcf2] py-6'>
    <div className='container mx-auto flex justify-between'>
        <span className='text-3xl text-[#3e3e3e] font-bold tracking-tight'>
            <Link to={"/"}>Best<span className='text-[#ff2d2d]'>Booking</span></Link>
        </span>
        <span className='flex space-x-2 items-center'>
          {isLoggedIn ? <>
            <Link className='flex items-center text-[#3e3e3e] px-3 font-bold hover:scale-90 duration-700' to={"/my-bookings"}>My Bookings</Link>
            <Link className='flex items-center text-[#3e3e3e] px-3 font-bold hover:scale-90 duration-700' to={"/my-hotels"}>My Hotels</Link>
            <SignOutButton />
          </> 
          :
          <Link to={"/sign-in"} className='flex items-center text-[#3e3e3e] p-2 font-bold bg-[#bbeeff] hover:scale-90 rounded-xl duration-700'>Sign In</Link>
          }
        </span>
    </div>
    </div>
  )
}

export default Header
