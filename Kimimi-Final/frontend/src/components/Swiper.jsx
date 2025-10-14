import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Message from "./Message";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaDollarSign,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[22rem]">
        <span className="text-gray-600">Loading...</span>
      </div>
    );

  if (error)
    return (
      <Message variant="danger">
        {error?.data || error.error}
      </Message>
    );

  return (
    <div className="w-full h-full mb-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="w-full h-full"
      >
        {products.map(
          ({
            image,
            _id,
            name,
            price,
            description,
            brand,
            createdAt,
            numReviews,
            rating,
            quantity,
          }) => {
            // ✂️ Limit description length dynamically
            const shortDesc =
              description?.length > 90
                ? description.substring(0, 50) + "..."
                : description;

            return (
              <SwiperSlide
                key={_id}
                className="flex items-center justify-center h-[50vh] sm:h-[60vh] md:h-[70vh]"
              >
                <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden pt-10 md:pt-0">
                  {/* Image */}
                  <div className="w-full md:w-1/2 h-full flex justify-center items-center">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-full object-contain rounded-t-lg md:rounded-l-lg md:rounded-t-none "
                    />
                  </div>

                  {/* Product details */}
                  <div className="w-full md:w-1/2 flex flex-col justify-start p-3 md:p-6 text-center md:text-left">
                    <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-1 truncate">
                      {name}
                    </h2>

                    {/* Shortened description */}
                    <p className="text-gray-700 text-sm sm:text-base md:text-sm lg:text-base xl:text-lg line-clamp-2">
                      {shortDesc}
                    </p>

                    {/* Price - always visible */}
                    <div className="flex items-center justify-center md:justify-start">
                      <FaDollarSign className="mr-2 text-gray-800 text-sm sm:text-lg" />
                      <span className="text-gray-800 font-medium text-sm sm:text-lg">
                        ₵ {price}
                      </span>
                    </div>

                    {/* Hidden details on small screens */}
                    <div className="hidden sm:flex flex-col space-y-2 md:space-y-2 mt-2">
                      <div className="flex items-center">
                        <FaStore className="mr-2 text-gray-800" />
                        <span className="text-gray-800 font-medium">
                          Brand: {brand}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <FaClock className="mr-2 text-gray-800" />
                        <span className="text-gray-800 font-medium">
                          Added: {moment(createdAt).fromNow()}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <FaStar className="mr-2 text-gray-800" />
                        <span className="text-gray-800 font-medium">
                          Reviews: {numReviews}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <FaStar className="mr-2 text-gray-800" />
                        <span className="text-gray-800 font-medium">
                          Ratings: {Math.round(rating)}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <FaShoppingCart className="mr-2 text-gray-800" />
                        <span className="text-gray-800 font-medium">
                          Quantity: {quantity}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <FaBox className="mr-2 text-gray-800" />
                        <span className="text-gray-800 font-medium">
                          {quantity > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
