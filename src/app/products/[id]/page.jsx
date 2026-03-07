import CartBUtton from "@/components/buttons/CartBUtton";
import { getSingleProduct } from "@/actions/server/product";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-400" />);
    else if (rating >= i - 0.5)
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
  }
  return stars;
};

const ProductDetails = async ({ params }) => {
  const { id } = await params;
  const product = await getSingleProduct(id);

  if (!product?._id) {
    return <div className="text-center py-20 text-xl">Product Not Found</div>;
  }

  //  Destructure everything here
  const {
    _id,
    title,
    bangla,
    image,
    price,
    discount,
    ratings,
    reviews,
    sold,
    description,
    info,
    qna,
  } = product;

  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-base-100 p-5 rounded-xl shadow-md">
          <img
            src={image}
            alt={title}
            className="w-full rounded-lg object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-lg text-gray-500 mb-4">{bangla}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">{renderStars(ratings)}</div>
            <span>({reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="mb-4">
            <span className="text-2xl font-bold text-primary">
              ৳{discountedPrice}
            </span>

            {discount > 0 && (
              <span className="ml-3 line-through text-gray-400">৳{price}</span>
            )}
          </div>

          <p className="text-sm text-gray-500 mb-4">{sold} items sold</p>

          {/* add to cart */}
          <CartBUtton product={product} />

          {/* Info List */}
          <ul className="list-disc pl-5 space-y-2">
            {info?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p className="whitespace-pre-line text-gray-700">{description}</p>
      </div>

      {/* QnA */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Q & A</h2>
        <div className="space-y-4">
          {qna?.map((item, index) => (
            <div key={index} className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title font-medium">{item.question}</div>
              <div className="collapse-content">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
