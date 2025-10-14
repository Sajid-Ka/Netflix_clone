import { useState, useEffect } from "react";
import { useAuth } from "./Context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.email) setEmail(state.email);
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signup(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-black/80 p-8 rounded-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-500 p-4 rounded w-full mb-4 bg-black/50 placeholder-gray-400"
            required
          />
          <button className="bg-red-600 p-4 rounded w-full font-bold text-lg">Sign Up</button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
