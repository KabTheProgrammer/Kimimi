import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  console.log("SmallProduct id:", product._id);
  return (
    <Link 
      to={`/product/${product._id}`} 
      className="w-full max-w-md h-[28rem] ml-[2rem] p-3 block"
      >
      <div className="relative h-[85%]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-t"
          />
        <HeartIcon product={product} />
      </div>

      <div className="p-2 bg-white rounded-b h-[15%] flex items-center justify-between">
        <span className="product-name text-lg text-gray-800 px-2 py-1 rounded">
          {product.name}
        </span>
        <span className="product-price bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full flex items-center justify-center">
          ₵ {product.price}
        </span>
      </div>
    </Link>
  );
};

export default SmallProduct;
