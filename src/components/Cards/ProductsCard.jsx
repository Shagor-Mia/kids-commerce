"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

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
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300">
      {/* Clickable Image */}
      <Link href={`/products/${_id}`}>
        <figure>
          <Image
            height={200}
            width={300}
            src={image}
            alt={title}
            className="h-48 w-full object-cover rounded-t-lg"
          />
        </figure>
      </Link>

      <div className="card-body p-4">
        {/* Clickable Title */}
        <Link href={`/products/${_id}`}>
          <h2 className="card-title text-md font-semibold hover:text-primary cursor-pointer">
            {title}
          </h2>
        </Link>

        <div className="flex items-center space-x-2 text-sm mt-1">
          <div className="flex">{renderStars(ratings)}</div>
          <span>({reviews} reviews)</span>
        </div>

        <p className="text-lg font-bold mt-2">৳{price}</p>
        <p className="text-sm text-gray-500">{sold} sold</p>

        <div className="card-actions mt-4 flex gap-2">
          <button className="btn btn-primary ">Add to Cart</button>

          <Link href={`/products/${_id}`} className="">
            <button className="btn btn-primary btn-outline ">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
