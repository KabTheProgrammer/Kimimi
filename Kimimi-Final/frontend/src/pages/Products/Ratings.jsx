import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text, color }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center gap-2"> {/* Added gap for spacing */}
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className={`text-${color}`} />
        ))}

        {halfStars === 1 && <FaStarHalfAlt className={`text-${color}`} />}

        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} className={`text-${color}`} />
        ))}
      </div>

      {text && <span className={`text-white text-sm`}>{text}</span>}
    </div>
  );
};

Ratings.defaultProps = {
  color: "yellow-500",
};

export default Ratings;
