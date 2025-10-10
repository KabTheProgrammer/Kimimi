import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="product-container p-2 relative w-full max-w-md h-[36rem]">
      <Link
        to={`/product/${product._id}`}
        className="block h-full" // Make the link cover the full card
      >
        {/* Image */}
        <div className="image-container relative h-[85%]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-t"
          />
        </div>

        {/* Description */}
        <div className="p-2 bg-white rounded-b h-[15%] flex items-center justify-between">
          <span className="product-name text-lg text-gray-800 px-2 py-1 rounded">
            {product.name}
          </span>
          <span className="product-price bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full flex items-center justify-center">
            ₵ {product.price}
          </span>
        </div>
      </Link>

      {/* Keep HeartIcon outside the Link so clicking it won't navigate */}
      <HeartIcon product={product} />
    </div>
  );
};

export default Product;
