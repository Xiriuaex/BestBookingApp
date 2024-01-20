import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";


const DetailsSection = () => {

    const { register, formState: {errors} } = useFormContext<HotelFormData>();
  return (
    
    <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Add Hotel</h2>
        <h2 className="text-xl font-bold pt-6">Basic details</h2>

        <label className="text-gray-700 text-sm font-bold w-[50%]">
            Name
            <input type="text" className="shadow-md w-full py-1 px-2 font-normal after:bg-green-700" 
                {...register("name", {required: "*This field is required"})}
            />
            {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
            )}
        </label> 

        <div className="flex gap-4">
            <label className="text-gray-700 text-sm font-bold flex-1">
                City
                <input type="text" className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("city", {required: "*This field is required"})}
                />
                {errors.city && (
                    <span className="text-red-500">{errors.city.message}</span>
                )}
            </label> 
            <label className="text-gray-700 text-sm font-bold flex-1">
                Country
                <input type="text" className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("country", {required: "*This field is required"})}
                />
                {errors.country && (
                    <span className="text-red-500">{errors.country.message}</span>
                )}
            </label> 
        </div>

        <label className="text-gray-700 text-sm font-bold max-w-[50%]">
            Description
            <textarea rows={6} className="border rounded w-full py-1 px-2 font-normal" 
                {...register("description", {required: "*This field is required"})}
            ></textarea>
            {errors.description && (
                <span className="text-red-500">{errors.description.message}</span>
            )}
        </label> 

        <label className="text-gray-700 text-sm font-bold max-w-[50%]">
            Price Per Night
            <input type="number" min={1} className="border rounded w-full py-1 px-2 font-normal" 
                {...register("pricePerNight", {required: "*This field is required"})}
            />
            {errors.pricePerNight && (
                <span className="text-red-500">{errors.pricePerNight.message}</span>
            )}
        </label> 

        <label className="text-gray-700 text-sm font-bold max-w-[50%]">
            Star Rating
            <select {...register("starRating", {
                required: "*This field is required",
            })}
            className="border rounded w-full p-2 text-gray-700 font-normal"
            >
                <option value="" className="text-sm font-bold" selected disabled>
                    Select as Rating
                </option>
                {[1,2,3,4,5].map((num) => (
                    <option value={num}>{num}</option>
                ))}
            </select>
            {errors.starRating && (
                <span className="text-red-500">{errors.starRating.message}</span>
            )}
        </label> 

    </div>

  )
}

export default DetailsSection;
