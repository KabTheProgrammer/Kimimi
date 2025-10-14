import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, [dispatch]);

  const toggleFavorites = (e) => {
    // Stop everything so the parent Link won't receive this event
    if (e) {
      e.preventDefault?.();
      e.stopPropagation?.();
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  // helper to stop both pointer and keyboard events before they bubble
  const stopAndToggle = (e) => {
    e.preventDefault?.();
    e.stopPropagation?.();
    toggleFavorites(e);
  };

  return (
    // Use a button (not a div) so it's semantic and doesn't accidentally submit forms.
    <button
      type="button"
      onClick={stopAndToggle}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        // make keyboard accessible: toggle on Enter/Space but don't let event bubble
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorites(e);
        }
      }}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className="absolute top-3 right-3 z-30 cursor-pointer bg-white/70 p-2 rounded-full shadow-md hover:bg-white transition"
    >
      {isFavorite ? (
        <FaHeart className="text-pink-600 text-xl" />
      ) : (
        <FaRegHeart className="text-black text-xl" />
      )}
    </button>
  );
};

export default HeartIcon;
