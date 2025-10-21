import { useEffect, useMemo, useRef, useState } from 'react';
import MovieModal from './Modal/MovieModal';

const Trends = () => {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [movies,setMovies] = useState([]);
    const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results.slice(0,10));
            })
            .catch((error) => console.error("Error fetching trending movies: ",error));
    },[]);

    const fetchMovieDetails = ((movieId) => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`)
            .then((res) => res.json())
            .then((data) => setSelectedMovieDetails(data))
            .catch((error) => console.error("Error fetching movie details: ",error));
    })

    const handleMovieClick = (movieId) => {
        fetchMovieDetails(movieId);
    }

    const scrollToEnd = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: scrollRef.current.scrollWidth,
                behavior: 'smooth'
            });
            setShowLeftArrow(true);
        }
    };

    const scrollToStart = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
            setShowLeftArrow(false);
        }
    };

    return (
        <div className="py-10 md:py-25 px-4 md:px-0 relative">
            <div className="font-bold text-xl md:text-2xl mb-4">
                Trending Now
            </div>
            <div className="relative">
                <div 
                    ref={scrollRef}
                    className="flex gap-4 md:gap-10 overflow-x-scroll hide-scrollbar pb-4"
                >
                    {movies.map((movie, index) => (
                        <div 
                            key={movie.id} 
                            className="flex-shrink-0 relative ml-4 cursor-pointer"
                            onClick={() => handleMovieClick(movie.id)}
                        >
                            <img 
                                className="rounded-2xl w-[120px] md:w-[180px] h-[180px] md:h-[270px] object-cover" 
                                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                                alt={`Trending ${movie.title}`} 
                            />
                            <div className="text-6xl md:text-9xl font-bold absolute bottom-0 left-[-15px] md:left-[-25px] text-stroke-white">
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
                {!showLeftArrow && (
                    <button 
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full"
                        onClick={scrollToEnd}
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
                {showLeftArrow && (
                    <button 
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full"
                        onClick={scrollToStart}
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}
            </div>

            {selectedMovieDetails && (
                <MovieModal 
                    details={selectedMovieDetails}
                    onClose={() => setSelectedMovieDetails(null)} 
                />
            )}
        </div>
    );
};

export default Trends;