import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RxArrowLeft } from "react-icons/rx";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const Trailer = () => {
  const { id } = useParams();
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const data = await res.json();
        const youtubeTrailer = data.results.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );
        if (youtubeTrailer) {
          setTrailerKey(youtubeTrailer.key);
        } else {
          setError("Trailer not available");
        }
      } catch (err) {
        console.error("Error fetching trailer:", err);
        setError("Failed to load trailer");
      } finally {
        setLoading(false);
        setTimeout(() => setVisible(true), 100);
      }
    };

    fetchTrailer();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Loading trailer...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white text-xl">
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-red-600 px-4 py-2 rounded font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      className={`bg-black min-h-screen flex flex-col items-center justify-center p-4 transition-opacity duration-700 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        onClick={() => navigate(-1)}
        className="self-start text-white flex items-center gap-2 mb-4 hover:text-gray-300"
      >
        <RxArrowLeft size={22} /> Back
      </button>

      {trailerKey ? (
        <div className="w-full max-w-4xl aspect-video shadow-lg rounded-xl overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="rounded-xl"
          ></iframe>
        </div>
      ) : (
        <p className="text-white text-lg">No trailer available.</p>
      )}
    </div>
  );
};

export default Trailer;
