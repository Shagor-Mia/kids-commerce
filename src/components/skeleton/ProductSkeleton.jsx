import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="card w-80 bg-base-100 shadow-md animate-pulse">
      <div className="h-48 bg-gray-300 skeleton"></div>
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-300 w-3/4 skeleton rounded"></div>
        <div className="h-4 bg-gray-300 w-1/2 skeleton rounded"></div>
        <div className="h-6 bg-gray-300 w-full skeleton rounded"></div>
        <div className="h-6 bg-gray-300 w-1/2 skeleton rounded"></div>
        <div className="h-10 bg-gray-300 w-full skeleton rounded"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
