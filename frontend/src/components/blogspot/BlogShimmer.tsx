const ShimmerCard = () => {
  return (
    <div className="mt-10 animate-pulse">
      <div className="flex flex-row items-center gap-x-3">
        {/* Profile Picture Placeholder */}
        <div className="w-10 h-10 bg-gray-300 rounded-full shadow-md"></div>
        {/* Author Name and Published Date Placeholder */}
        <div className="flex flex-col gap-y-1">
          <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
          <div className="w-16 h-3 bg-gray-300 rounded-md"></div>
        </div>
      </div>

      {/* Title Placeholder */}
      <div className="w-full h-6 mt-4 bg-gray-300 rounded-md"></div>

      {/* Content Placeholder */}
      <div className="w-full mt-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded-md"></div>
        <div className="h-4 bg-gray-300 rounded-md"></div>
        <div className="w-5/6 h-4 bg-gray-300 rounded-md"></div>
      </div>

      {/* Read Time Placeholder */}
      <div className="flex items-center justify-between w-full mt-3 gap-x-2">
        <div className="flex items-center gap-x-3">
          <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
          <div className="w-20 h-4 bg-gray-300 rounded-md"></div>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
        </div>
      </div>

      {/* Divider Placeholder */}
      <div className="w-full h-[1px] bg-gray-300 mt-4"></div>
    </div>
  );
};

export default ShimmerCard;
