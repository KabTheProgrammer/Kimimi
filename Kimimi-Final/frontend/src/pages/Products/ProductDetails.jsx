import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";
import Navbar from "../../components/Navbar";

// 🧩 Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  // ✅ Handle multiple or single images
  const images =
    product?.images && product.images.length > 0
      ? product.images
      : [product?.image];

  return (
    <>
      <div className="hidden sm:block text-center mb-4">
        <Link to="/" className="text-white font-semibold hover:underline">
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="block md:hidden w-full relative">
            <Navbar />
          </div>

          <div className="flex flex-col items-center mt-8 px-4">
            <div className="w-full max-w-4xl flex flex-col justify-center items-center relative">
              {/* 🖼️ Product Image Slider */}
              <div className="relative w-full md:w-[500px] mb-6">
                <Swiper
                  modules={[Navigation, Pagination, Thumbs, FreeMode]}
                  navigation
                  pagination={{ clickable: true }}
                  thumbs={{ swiper: thumbsSwiper }}
                  spaceBetween={10}
                  className="rounded-lg"
                >
                  {images.map((img, index) => (
                    <SwiperSlide
                      key={index}
                      className="flex justify-center items-center bg-black relative"
                    >
                      {/* Image fully visible (not cropped) */}
                      <img
                        src={img}
                        alt={product.name}
                        className="w-full h-[400px] object-contain rounded-lg"
                      />

                      {/* ❤️ Favorite Icon — stays inside image */}
                      <div className="absolute top-3 right-3 z-20">
                        <HeartIcon product={product} color="black" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Thumbnail Slider */}
                {images.length > 1 && (
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    modules={[FreeMode, Thumbs]}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    className="mt-3"
                  >
                    {images.map((img, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={img}
                          alt={`Thumbnail ${index}`}
                          className="cursor-pointer rounded-md border border-gray-700 hover:border-pink-500 transition object-contain bg-black"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>

            {/* 🛍️ Product Info */}
            <div className="w-full max-w-4xl text-left">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 text-[#B0B0B0]">{product.description}</p>

              <p className="text-5xl my-4 font-extrabold">₵ {product.price}</p>

              <div className="flex flex-col sm:flex-row justify-between w-full mb-6">
                <div>
                  <h1 className="flex items-center mb-2">
                    <FaStore className="mr-2 text-white" /> Brand:{" "}
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-2">
                    <FaClock className="mr-2 text-white" /> Added:{" "}
                    {moment(product.createdAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-2">
                    <FaStar className="mr-2 text-white" /> Reviews:{" "}
                    {product.numReviews}
                  </h1>
                </div>

                <div>
                  <h1 className="flex items-center mb-2">
                    <FaStar className="mr-2 text-white" /> Ratings:{" "}
                    {product.rating}
                  </h1>
                  <h1 className="flex items-center mb-2">
                    <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  {product.quantity > 0 && (
                    <div>
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="p-2 w-full sm:w-24 rounded-lg text-black"
                      >
                        {[...Array(product.quantity).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between w-full mb-6">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </div>

              <button
                onClick={addToCartHandler}
                disabled={product.quantity === 0}
                className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 w-full sm:w-auto"
              >
                Add To Cart
              </button>

              <div className="mt-8">
                <ProductTabs
                  loadingProductReview={loadingProductReview}
                  userInfo={userInfo}
                  submitHandler={submitHandler}
                  rating={rating}
                  setRating={setRating}
                  comment={comment}
                  setComment={setComment}
                  product={product}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
