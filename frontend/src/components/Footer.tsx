

const Footer = () => {
  return (
    <div className="bg-[#66fcf2] font-bold text-[#3e3e3e] tracking-tight py-10">
      <div className="container mx-auto flex justify-between items-center space-x-10">
            <span className="text-sm sm:text-xl md:text-3xl ">
                BestBooking
            </span>
            <span className="flex gap-4">
                <p className="text-sm sm:text-xl cursor-pointer">privacy policy</p>
                <p className="text-sm sm:text-xl cursor-pointer">Terms of Service</p>
            </span>

      </div>
    </div>
  )
}

export default Footer
