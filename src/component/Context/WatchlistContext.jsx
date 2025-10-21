import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase/Firebase";
import { collection, doc, deleteDoc, setDoc, onSnapshot, query, orderBy ,serverTimestamp} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const WatchlistContext = createContext();

export const WatchlistProvider = ({children}) => {
    const {currentUser, loading : authLoading} = useAuth();
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!currentUser){
            setWatchlist([]);
            setLoading(false);
            return;
        }

        const moviesColRef = collection(db, "watchlists", currentUser.uid, "movies");
        const q = query(moviesColRef, orderBy("addedAt", "desc"));

        const unsub = onSnapshot(q, (snapshot) => {
            const arr = snapshot.docs.map((d) => d.data());
            setWatchlist(arr);
            setLoading(false);
        }, (err) => {
            console.error("Watchlist snapshot error : ", err);
            setLoading(false);
        })

        return () => unsub();
    },[currentUser]);


    const addMovie = async (movie) => {
        if(!currentUser) throw new Error("Not Authenticated");
        try {
            const movieDocRef = doc(db, "watchlists", currentUser.uid, "movies", String(movie.id));
            await setDoc(movieDocRef,{...movie, addedAt : serverTimestamp()});
        } catch (error) {
            console.error("Error adding movie to watch list : ",error);
            throw error;
        }
    }

    const removeMovie = async (movieId) => {
        if(!currentUser) throw new Error("Not Authenticated");
        try {
            const movieDocRef = doc(db, "watchlists", currentUser.uid, "movies", String(movieId));
            await deleteDoc(movieDocRef);
        } catch (error) {
            console.error("Error removing movie from watchlist", error);
            throw error;
        }
    }

    const isInWatchlist = (movieId) => {
        return watchlist.some((m) => String(m.id) === String(movieId));
    }

    const value = {
        watchlist,
        loading,
        addMovie,
        removeMovie,
        isInWatchlist
    }

    return (
        <WatchlistContext.Provider value={value}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => useContext(WatchlistContext);