import { hotelTypes } from "../../config/hotel-options-config";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {

    const { register, watch, formState: {errors} } = useFormContext<HotelFormData>();
    const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Hotel Type</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
            <label className={
              typeWatch === type ? "cursor-pointer bg-blue-300 text-xs md:text-sm rounded-2xl px-4 pt-3 pb-2 font-semibold" 
              : "cursor-pointer hover:bg-blue-100 active:bg-blue-200 bg-gray-300 text-xs md:text-sm rounded-2xl px-4 pt-3 pb-2 font-semibold" 
            }>
                <input type="radio" className="hidden" value={type} {...register("type", { required: "*This field is required"})} />
                <span>{type}</span>
            </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500">{errors.type.message}</span>
      )}
    </div>
  )
}

export default TypeSection
