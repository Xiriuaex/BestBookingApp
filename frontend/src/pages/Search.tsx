import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from '../api-client';
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/starRatingFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import PriceFilter from "../components/PriceFilter";


const Search = () => {
    const search = useSearchContext();
    console.log(search);
    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string>("");

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars, 
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption,
    };
    
    const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
        apiClient.searchHotels(searchParams)
    );

    const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;
    
        setSelectedStars((prevStars) =>
          event.target.checked
            ? [...prevStars, starRating]
            : prevStars.filter((star) => star !== starRating)
        );
      };
      
      const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const facility = event.target.value;
    
        setSelectedFacilities((prevFacilities) =>
          event.target.checked
            ? [...prevFacilities, facility]
            : prevFacilities.filter((prevFacility) => prevFacility !== facility)
        );
      };

      const handleHotelTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const hotelType = event.target.value;
    
        setSelectedHotelTypes((prevHotelTypes) =>
          event.target.checked
            ? [...prevHotelTypes, hotelType]
            : prevHotelTypes.filter((hotel) => hotel !== hotelType)
        );
      };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div className="rounded-lg border border-slate-300 p-5 h-fit block lg:sticky top-10">
            <div className="space-y-5">
                <h3 className="text-lg font-semibold border-b border-slate-300 pb-4">
                    Filter By:
                </h3>
                <StarRatingFilter
                    selectedStars={selectedStars}
                    onChange={handleStarsChange}
                />
                <FacilitiesFilter
                     selectedFacilities={selectedFacilities}
                     onChange={handleFacilityChange}
                />
                 <HotelTypesFilter
                    selectedHotelTypes={selectedHotelTypes}
                    onChange={handleHotelTypeChange}
                /> 
                <PriceFilter
                    selectedPrice={selectedPrice}
                    onChange={(value?: number) => setSelectedPrice(value)}
                />
            </div>
        </div>

        <div className="flex flex-col gap-5 ">
            <div className="flex flex-col space-y-2 sm:flex-row justify-between items-center">
                <span className="text-xl font-bold">
                    {hotelData?.pagination.total} Hotels found
                    {search.destination ? ` in ${search.destination}`: ""}
                </span>
                <select
                    value={sortOption}
                    onChange={(event) => setSortOption(event.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="">Sort By</option>
                    <option value="starRating">Star Rating</option>
                    <option value="pricePerNightAsc">
                    Price Per Night (low to high)
                    </option>
                    <option value="pricePerNightDesc">
                    Price Per Night (high to low)
                    </option>
                </select>
            </div>
            {hotelData?.data.map((hotel) => (
                <SearchResultsCard hotel={hotel}/>
            ))} 
            <div>
                <Pagination
                    page={hotelData?.pagination.page || 1}
                    pages={Math.ceil(Number(hotelData?.pagination.total)/5) || 1}
                    onPageChange={(page) => setPage(page)}
                />
            </div>
        </div>
    </div>
  )
}

export default Search
