

const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center space-x-10">
            <span className="text-sm sm:text-xl md:text-3xl text-white font-bold tracking-tight">
                BestBooking
            </span>
            <span className="text-white font-bold tracking-tight flex gap-4">
                <p className="text-sm sm:text-xl cursor-pointer">privacy policy</p>
                <p className="text-sm sm:text-xl cursor-pointer">Terms of Service</p>
            </span>

      </div>
    </div>
  )
}

export default Footer
