import { hotelFacilities } from "../../config/hotel-options-config";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";


const Facilities = () => {

    const { register, formState: {errors} } = useFormContext<HotelFormData>(); 

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Hotel Type</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {hotelFacilities.map((facility) => (
            <label aria-checked className={ "hover:bg-blue-100 has-[input:checked]:bg-blue-300 bg-gray-300 cursor-pointer text-xs md:text-sm rounded-2xl px-4 pt-3 pb-2 font-semibold"}>
                <input type="checkbox" className="hidden"  value={facility} {...register("facilities", { validate: (facilities) => {
                    if (facilities && facilities.length > 0) {
                        return true;
                    } else {
                        return "At least one facility is required";
                    }
                } })} />
                <span>{facility}</span>
            </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500">{errors.facilities.message}</span>
      )}
    </div>
  )
}

export default Facilities;
