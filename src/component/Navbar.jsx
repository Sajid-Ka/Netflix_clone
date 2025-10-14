import { useAuth } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";
import banner from "../assets/bannerbg.jpg";
import netflixLogo from "../assets/Netflix_2015_logo.svg";
import { useState } from "react";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleGetStarted = () => {
    if (currentUser) {
      navigate("/");
    } else {
      navigate("/signup", { state: { email } });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="px-4 md:px-30 py-5 bg-black bg-cover text-white z-10 relative min-h-[70vh] md:min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${banner})` }}></div>
      
      <div className="relative z-10 w-full">
        <div className="flex justify-between items-center mb-8 md:mb-0">
          <img className="h-10" src={netflixLogo} alt="Netflix Logo" />

          <div className="flex items-center gap-2 md:gap-0">
            <select className="pr-8 md:pr-12 border p-1 md:mr-2 border-gray-500 bg-transparent text-sm md:text-base">
              <option className="text-black" value="English">English</option>
              <option className="text-black" value="Arabic">Arabic</option>
            </select>

            {currentUser ? (
              <button onClick={handleLogout} className="bg-red-600 px-3 md:px-5 py-1 rounded text-sm md:text-base">
                Sign Out
              </button>
            ) : (
              <button onClick={() => navigate("/login")} className="bg-red-600 px-3 md:px-5 py-1 rounded text-sm md:text-base">
                Sign In
              </button>
            )}
          </div>
        </div>

        <div className="py-10 md:py-30 flex flex-col items-center text-center">
          <div className="text-3xl md:text-6xl font-bold w-full md:w-160 leading-tight">
            Unlimited movies, TV shows and more
          </div>
          <div className="py-3 md:py-5 font-bold text-lg md:text-xl">
            Starts at ₹149. Cancel at any time.
          </div>
          <p className="text-base md:text-lg mb-4 md:mb-0">
            Ready to watch? Enter your email to create or restart your membership.
          </p>

          <div className="py-3 md:py-5 flex flex-col md:flex-row gap-3 md:gap-0 w-full max-w-2xl">
            <input 
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 md:p-4 border-gray-500 rounded flex-1 mr-2 bg-black/50 placeholder-gray-400"
            />
            <button 
              onClick={handleGetStarted} 
              className="bg-red-600 p-3 md:p-4 rounded font-bold text-lg md:text-xl whitespace-nowrap"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
