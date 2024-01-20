import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";


const Guests = () => {

    const { register, formState: {errors} } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4"> 
        <h2 className="text-xl font-bold pt-6">Guests</h2>

        <div className="flex gap-4 bg-[#E4F1FF] px-10 py-7 rounded-lg">
            <label className="text-gray-700 text-sm font-bold flex-1">
                Adults
                <input type="number" min={20} className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("adultCount", {required: "*This field is required"})}
                />
                {errors.adultCount && (
                    <span className="text-red-500">{errors.adultCount.message}</span>
                )}
            </label> 
            <label className="text-gray-700 text-sm font-bold flex-1">
                Children
                <input type="number" min={0} className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("childCount", {required: "*This field is required"})}
                />
                {errors.childCount && (
                    <span className="text-red-500">{errors.childCount.message}</span>
                )}
            </label> 
        </div>
    </div>

  )
}

export default Guests;
