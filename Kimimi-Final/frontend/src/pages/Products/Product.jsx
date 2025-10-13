import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="product-container p-2 relative w-full max-w-md h-[36rem]">
      <Link to={`/product/${product._id}`} className="block h-full">
        {/* Image */}
        <div className="image-container relative h-[85%] sm:h-[85%]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-t"
          />
        </div>

        {/* Description */}
        <div
          className="
            p-2 bg-white rounded-b flex items-center justify-between
            sm:h-[15%]
            absolute bottom-0 left-0 right-0
            sm:static
          "
        >
          <span className="product-name text-lg text-gray-800 px-2 py-1 rounded">
            {product.name}
          </span>
          <span className="product-price bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full flex items-center justify-center">
            ₵ {product.price}
          </span>
        </div>
      </Link>

      <HeartIcon product={product} />
    </div>
  );
};

export default Product;
