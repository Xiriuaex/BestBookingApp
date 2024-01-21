import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiRupee, BiStar } from "react-icons/bi";

const MyHotels = () => {
    const { data: hotelData } = useQuery(
        "fetchMyHotels",
        apiClient.fetchMyHotels,
        {
            onError: () => {},
        }
    )

    if(!hotelData) return <span>No Hotel Found</span>
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link to={"/add-hotel"} className="flex bg-[#9df8f2] text-[#3e3e3e] text-xl font-bold rounded-xl p-2 hover:bg-[#62f5eb]">
            Add Hotel
        </Link>
      </span>

        <div className="grid grid-cols-1 gap-8">
            {hotelData.map((hotel) => (
                <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
                    <h2 className="text-2xl font-bold">{hotel.name}</h2>
                    <div className="whitespace-pre-line">{hotel.description}</div>
                    <div className="grid grid-cols-5 gap-2 text-sm">
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center hover:scale-95 duration-700">
                            <BsMap className="mr-2"/> 
                            {hotel.city}, {hotel.country}
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center hover:scale-95 duration-700">
                            <BsBuilding className="mr-2"/> 
                            {hotel.type}
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center hover:scale-95 duration-700">
                            <BiMoney className="mr-2"/> 
                            <BiRupee />
                            {hotel.pricePerNight}/N
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center hover:scale-95 duration-700">
                            <BiHotel className="mr-2"/> 
                            {hotel.adultCount} adults, {hotel.childCount} children
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center hover:scale-95 duration-700">
                            <BiStar className="mr-2"/> 
                            {hotel.starRating} Star Rating
                        </div>
                    </div>

                    <span className="flex justify-end">
                        <Link to={`/edit-hotel/${hotel._id}`} className="flex bg-[#9df8f2] text-[#3e3e3e] text-sm rounded-2xl p-2 hover:bg-[#62f5eb]">View Details</Link>
                    </span>
                </div>
            ))}
        </div>

    </div>
  )
}

export default MyHotels
