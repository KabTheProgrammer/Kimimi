import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="product-container relative w-full max-w-md bg-transparent">
      <Link to={`/product/${product._id}`} className="block no-underline">
        {/* Image */}
        <div className="image-container w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover block rounded-t-md"
          />
        </div>

        {/* Pink line between image and details */}
        <div className="w-full h-[2px] bg-pink-600"></div>

        {/* Description */}
        <div className="description bg-white rounded-b-md flex items-center justify-between px-3 py-6">
          <span className="text-base sm:text-lg text-gray-800 truncate">
            {product.name}
          </span>
          <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            ₵ {product.price}
          </span>
        </div>
      </Link>

      {/* Heart icon outside link */}
      <HeartIcon product={product} />
    </div>
  );
};

export default Product;
