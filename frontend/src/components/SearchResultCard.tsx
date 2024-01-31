import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";

type Props = {
    hotel: HotelType;
  };

const SearchResultsCard = ({ hotel }: Props ) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] border rounded-xl shadow-md bg-slate-200 bg-opacity-80 p-8 gap-8">
        <div className="w-full h-[200px] sm:h-[300px]">
          <img
            src={hotel.imageUrls[0]}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="grid grid-rows-[.5fr_1fr_.7fr] sm:grid-rows-[1fr_2fr_1fr]">
          <div>
            <div className="flex items-center">
              <span className="flex">
                {Array.from({ length: hotel.starRating }).map(() => (
                  <AiFillStar className="fill-yellow-400" />
                ))}
              </span>
              <span className="ml-1 text-sm">{hotel.type}</span>
            </div>
            <Link
              to={`/detail/${hotel._id}`}
              className="text-2xl font-bold cursor-pointer"
            >
              {hotel.name}
            </Link>
          </div>
  
          <div>
            <div className="line-clamp-4">{hotel.description}</div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 items-end whitespace-nowrap">
            <div className="items-center grid grid-cols-2 gap-3 sm:gap-4">
              {hotel.facilities.slice(0, 3).map((facility) => (
                <span className="bg-slate-300 p-2 rounded-lg font-bold text-[10px] sm:text-[11px] whitespace-nowrap">
                  {facility}
                </span>
              ))}
              <span className="text-sm">
                {hotel.facilities.length > 3 &&
                  `+${hotel.facilities.length - 3} more`}
              </span>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-2">
              <span className="font-bold ">£{hotel.pricePerNight} per night</span>
              <Link
                to={`/detail/${hotel._id}`}
                className="bg-blue-600 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-blue-500"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SearchResultsCard;