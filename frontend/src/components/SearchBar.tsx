import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext"
import { BiWorld } from "react-icons/bi";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";


const SearchBar = () => {
    const search = useSearchContext();
    const navigate = useNavigate();
    
    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);

    const handleSubmit = (event: FormEvent) => {
      event.preventDefault();
      search.saveSearchValues(
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount
      );
      navigate("/search");
    };

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    
  return (
    <form onSubmit={handleSubmit} className="mt-8 p-3 bg-gray-500 bg-opacity-30 rounded-2xl shadow-lg grid grid-cols-2 lg:grid-cols-5 items-center gap-3">
      <div className="flex flex-row items-center flex-1 bg-white p-2 rounded-xl">
        <BiWorld size={20} className="mr-2"/>
        <input
          placeholder="Where are you going?"
          className="text-[13px] w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex bg-white px-2 py-1 gap-2 flex-col rounded-xl">
        <label className="items-center flex min-w-fit">
          Adults:
          <input type="number"
            className="w-full p-1 focus:outline-none font-bold"
            min={1}
            max={50}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>

        <label className="items-center flex min-w-fit">
          Chidren:
          <input type="number"
            className="w-full p-1 focus:outline-none font-bold"
            min={0}
            max={50}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>

      <div>
        <DatePicker 
          selected={checkIn} 
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-In Date"
          className="min-w-full bg-white p-2 focus:outline-none rounded-xl" 
          wrapperClassName="min-w-full"
        />
      </div>
      
      <div>
        <DatePicker 
          selected={checkOut} 
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-Out Date"
          className="min-w-full bg-white p-2 focus:outline-none rounded-xl" 
          wrapperClassName="min-w-full"
        />
      </div>

      <div className="flex gap-2 ml-4 items-center">
        <button className="w-[50%] rounded-lg bg-blue-600 text-white h-full p-2 font-bold text-[14px] hover:bg-blue-500">
          Search
        </button>
        <button className="w-[30%] rounded-lg bg-red-600 text-white h-full p-2 font-bold text-[13px] hover:bg-red-500">
          Clear
        </button>
      </div>
    </form>
  )
}

export default SearchBar;