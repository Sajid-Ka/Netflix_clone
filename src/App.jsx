import { Route, Routes, Navigate } from 'react-router-dom';
import { ProtectedRoute,AuthRedirect } from './component/ProtectedRoute';
import Navbar from './component/Navbar';
import Trends from './component/Trends';
import Reasons from './component/Reasons';
import Questions from './component/Questions';
import Footer from './component/Footer';
import Signup from './component/Signup';
import Login from './component/Login';
import Watchlist from './component/Watchlist';
import Trailer from './component/Trailer';
import './App.css';

function App() {

  return (
    <div className="bg-black text-white">
      <Routes>
        <Route 
          path='/' 
          element={
            <ProtectedRoute>
              <div>
                <Navbar />
                <div className='max-w-7xl mx-auto'>
                  <Trends />
                  <Reasons />
                  <Questions />
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path='/mylist'
          element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          }
        />

        <Route 
          path='/trailer/:id'
          element={
            <ProtectedRoute>
              <Trailer />
            </ProtectedRoute>
          }
        />

        <Route 
          path='/login'
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />

        <Route 
          path='/signup'
          element={
            <AuthRedirect>
              <Signup />
            </AuthRedirect>
          }
        />
      </Routes>
    </div>
  );
}

export default App;