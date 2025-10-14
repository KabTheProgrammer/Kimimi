import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="flex flex-col items-center sm:ml-0 px-4">
      <h1 className="text-lg font-bold pt-[3rem] text-center">
        FAVORITE PRODUCTS
      </h1>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
          mt-6
          justify-center
        "
      >
        {favorites.map((product) => (
          <div key={product._id} className="flex justify-center">
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
