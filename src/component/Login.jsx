import { useState } from "react";
import { useAuth } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email,password);
            navigate("/");
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            <div className="bg-black/80 p-8 rounded-lg max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6">Sign In</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-500 p-4 rounded w-full mb-4 bg-black/50 placeholder-gray-400"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-500 p-4 rounded w-full mb-4 bg-black/50 placeholder-gray-400"
                    required
                />
                <button className="bg-red-600 p-4 rounded w-full font-bold text-lg">
                    Sign In
                </button>
                </form>

                <p className="text-center mt-4">
                New to Netflix?{" "}
                <a href="/signup" className="text-blue-500">
                    Sign Up
                </a>
                </p>
            </div>
        </div>
  );
};

export default Login;