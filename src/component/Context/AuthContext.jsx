import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, } from "firebase/auth";
import LoadingScreen from "../Loading";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email,password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email , password);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('Auth state changed:', user ? user.uid : null);
            setCurrentUser(user);
            setLoading(false);
        });
        console.log('Cleaning up auth listener');
        return unsubscribe;
    },[]);

    if(loading) {
        return (
            <LoadingScreen />
        )
    }

    const value = {
        currentUser,
        signup,
        login,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);