import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../Context/AuthContext";
import { useWatchlist } from "../Context/WatchlistContext";
import { useNavigate } from "react-router-dom";

const MovieModal = ({ details, onClose }) => {
  const {currentUser} = useAuth();
  const {addMovie, removeMovie, isInWatchlist} = useWatchlist();
  const navigate = useNavigate();

  if (!details) return null;

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const inWatchlist = isInWatchlist(details.id);

  const handleWatchlistToggle = async () => {
    if(!currentUser) {
      navigate("/login");
      return;
    }

    try {
      if(inWatchlist){
        await removeMovie(details.id);
      }else {
        await addMovie(details);
      }
    } catch (error) {
      console.error("Watchlist action failed : ", err)
    }
  }

  const handleTrailer = () => {
    navigate(`/trailer/${details.id}`);
  }

  const maturityRating = details.adult ? "A" : "U/A";
  const year = details.release_date ? details.release_date.slice(0, 4) : "N/A";
  const genres = details.genres ? details.genres.map((g) => g.name).join(", ") : "N/A";

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 transition-opacity duration-300 ease-in-out"
      style={{ opacity: details ? 1 : 0 }}
      onClick={handleOutsideClick}
    >
      <div
        className="bg-black rounded-lg overflow-hidden max-w-2xl w-full relative transform transition-transform duration-300 ease-in-out"
        style={{ transform: details ? "scale(1)" : "scale(0.7)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors duration-200"
        >
          <RxCross2 size={24} />
        </button>

        <img
          src={`https://image.tmdb.org/t/p/w780${details.backdrop_path || details.poster_path}`}
          alt={details.title}
          className="w-full h-auto"
        />

        <h2 className="text-3xl font-bold px-4 pt-4">{details.title}</h2>

        <div className="text-gray-400 px-4 py-2 flex flex-wrap gap-2 text-sm">
          <span>{year}</span>
          <span className="border border-gray-500 px-1">{maturityRating}</span>
          <span>Movie</span>
          <span>{genres}</span>
        </div>

        <p className="px-4 pb-4 text-gray-300">{details.overview}</p>

        <div className="px-4 pb-6 grid gap-3 md:flex md:items-center md:gap-4">
          <button
            onClick={handleWatchlistToggle}
            className="bg-red-600 text-white px-6 py-3 rounded font-bold w-full md:w-auto transition-colors duration-200 hover:bg-red-700"
          >
            {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>

          <button
            onClick={() => navigate(`/trailer/${details.id}`)}
            className="bg-red-600 text-white px-6 py-3 rounded font-bold w-full md:w-auto transition-colors duration-200 hover:bg-gray-600"
          >
            Watch Trailer
          </button>

          <button className="bg-red-600 text-white px-6 py-3 rounded font-bold w-full md:w-auto transition-colors duration-200 hover:bg-gray-700">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;