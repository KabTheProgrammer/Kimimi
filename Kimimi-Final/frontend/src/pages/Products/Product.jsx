import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div
      className="
        product-container p-2 relative w-full max-w-md
        sm:h-[36rem]            /* keep fixed height only for desktop */
        h-auto                  /* allow auto height on mobile */
      "
    >
      <Link to={`/product/${product._id}`} className="block h-full">
        {/* Image */}
        <div className="image-container relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full object-cover rounded-t
                       sm:h-[85%]   /* desktop height */
                       h-auto       /* mobile natural height */
            "
          />
        </div>

        {/* Description */}
        <div
          className="
            p-2 bg-white rounded-b flex items-center justify-between
            sm:h-[15%]      /* keep desktop layout */
            h-auto          /* natural mobile fit */
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
