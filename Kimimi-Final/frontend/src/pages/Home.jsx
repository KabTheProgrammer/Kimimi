import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import Footer from "./Footer/Footer";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[22rem]">
          <Loader />
        </div>
      ) : isError ? (
        <Message variant="danger">
          {isError?.data || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-center items-center mt-[5rem] flex-wrap text-center">
            <h1 className="text-[3rem] sm:text-[2rem] mb-4 sm:mb-0">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 ml-0 sm:ml-4"
            >
              Shop
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-center mt-[2rem] ml-[1rem] sm:ml-[2rem]">
            {data.products.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="m-2 block hover:scale-105 transition-transform duration-200"
              >
                <Product product={product} />
              </Link>
            ))}
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Home;
