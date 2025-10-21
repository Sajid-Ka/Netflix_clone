import { Navigate} from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

export const ProtectedRoute = ({children}) => {
    const {currentUser} = useAuth();


    if(!currentUser) {
        return <Navigate to="/login" replace />
    }

    return children;
}


export const AuthRedirect = ({children}) => {
    const {currentUser} = useAuth();
    if(currentUser) {
        return <Navigate to="/" replace />
    }
    return children
}

