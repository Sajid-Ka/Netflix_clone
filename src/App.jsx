import { useAuth } from './component/Context/AuthContext';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import Trends from './component/Trends';
import Reasons from './component/Reasons';
import Questions from './component/Questions';
import Footer from './component/Footer';
import Signup from './component/Signup';
import Login from './component/Login';
import './App.css';

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="bg-black text-white">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            currentUser ? (
              <div>
                <Navbar />
                <div className="max-w-7xl mx-auto">
                  <Trends />
                  <Reasons />
                  <Questions />
                  <Footer />
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;