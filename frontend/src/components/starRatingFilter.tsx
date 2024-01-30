type Props = {
    selectedStars: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
    return (
    <>
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      <div className="border-b border-slate-300 text-[8px] sm:text-[14px] gap-3 lg:text-[16px] pb-5 flex flex-row lg:flex-col">
       
        {["5", "4", "3", "2", "1"].map((star) => (
          <label className="flex items-center space-x-1">
            <input
              type="checkbox"
              className="rounded"
              value={star}
              checked={selectedStars.includes(star)}
              onChange={onChange}
            />
            <span>{star} Stars</span>
          </label>
        ))}
      </div>
    </>
    );
  };
  
  export default StarRatingFilter;