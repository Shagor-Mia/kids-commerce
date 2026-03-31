"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import CartBUtton from "../buttons/CartBUtton";

const ProductCard = ({ product }) => {
  const { _id, title, image, price, ratings, reviews, sold } = product;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i)
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      else if (rating >= i - 0.5)
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300 rounded-xl overflow-hidden">
      {/* Image */}
      <Link href={`/products/${_id}`}>
        <figure className="cursor-pointer">
          <Image
            height={200}
            width={300}
            src={image}
            alt={title}
            className="h-48 w-full object-cover"
          />
        </figure>
      </Link>

      <div className="card-body p-4">
        {/* Title */}
        <Link href={`/products/${_id}`}>
          <h2 className="card-title text-md font-semibold hover:text-primary cursor-pointer">
            {title}
          </h2>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm mt-1">
          <div className="flex">{renderStars(ratings)}</div>
          <span>({reviews} reviews)</span>
        </div>

        {/* Price */}
        <p className="text-lg font-bold mt-2">৳{price}</p>

        {/* Sold */}
        <p className="text-sm text-gray-500">{sold} sold</p>

        {/* Buttons */}
        <div className="mt-4  gap-2">
          {/* Add to Cart */}
          <CartBUtton product={{ ...product, _id: _id.toString() }} />

          {/* View Details */}
          <Link href={`/products/${_id}`}>
            <button className="btn btn-outline btn-primary w-full">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
