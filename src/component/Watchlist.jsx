import { useWatchlist } from "./Context/WatchlistContext";
import banner from '../assets/bannerbg.jpg'
import { useState } from "react";
import MovieModal from "./Modal/MovieModal";
import { RxCross2 } from "react-icons/rx";
import LoadingScreen from "./Loading";
import Footer from "./Footer";

const Watchlist = () => {
    const {watchlist, loading, removeMovie} = useWatchlist();
    const [selectedMovie, setSelectedMovie] = useState(null);

    if(loading) return <LoadingScreen />

    return (
    <div>
        <div className="px-4 md:px-30 py-5 bg-black bg-cover text-white z-10 relative min-h-[80vh] md:min-h-[90vh] flex items-center">
              <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${banner})` }}></div>
                <div className="max-w-7xl mx-auto py-10 px-4">
                    <h1 className="text-2xl font-bold mb-6">My Watchlist</h1>
                    {watchlist.length === 0 ? (
                        <p className="text-gray-400">Your watchlist is empty. Add movies from the Trending section</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                            {watchlist.map((movie) => (
                                <div key={movie.id} className="relative group">
                                <img
                                    className="w-full h-[220px] object-cover rounded-lg cursor-pointer"
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={movie.title}
                                    onClick={() => setSelectedMovie(movie)}
                                />
                                <button
                                    onClick={() => removeMovie(movie.id)}
                                    className="absolute top-2 right-2 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Remove from watchlist"
                                >
                                    <RxCross2 size={18} className="text-white" />
                                </button>
                                <div className="mt-2 text-sm font-semibold">{movie.title}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {selectedMovie && (
                        <MovieModal details={selectedMovie} onClose={() => setSelectedMovie(null)} />
                    )}
                </div>
            </div>
            <div className="bg-black p-32">

            </div>
            <Footer />
        </div>
    )
}

export default Watchlist