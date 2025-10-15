import { useState } from "react";
import { useAuth } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  // Firebase error mapping to user-friendly messages
  const getFirebaseErrorMessage = (error) => {
    switch (error.code) {
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/too-many-requests':
        return 'Too many failed login attempts. Please try again later.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      default:
        return 'An error occurred during sign in. Please try again.';
    }
  };

  const validateField = (name, value) => {
    const errors = {};
    
    switch (name) {
      case "email":
        if (!value.trim()) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = "Please enter a valid email address";
        }
        break;
      case "password":
        if (!value) {
          errors.password = "Password is required";
        } else if (value.length < 6) {
          errors.password = "Password must be at least 6 characters";
        }
        break;
      default:
        break;
    }
    
    return errors;
  };

  const validateForm = () => {
    const errors = {};
    
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    return errors;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const fieldErrors = validateField(field, field === 'email' ? email : password);
    setFormErrors(prev => ({ ...prev, ...fieldErrors }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTouched({ email: true, password: true });
    setError("");
    
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      try {
        await login(email, password);
        navigate("/");
      } catch (error) {
        const friendlyError = getFirebaseErrorMessage(error);
        setError(friendlyError);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Navbar />
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <div className="bg-black/90 p-8 rounded-lg max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6">Sign In</h2>
          {error && (
            <div className="bg-red-600/20 border border-red-600 text-red-400 p-3 rounded mb-4 text-center text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (touched.email) {
                    const errors = validateField('email', e.target.value);
                    setFormErrors(prev => ({ ...prev, ...errors }));
                  }
                }}
                onBlur={() => handleBlur('email')}
                className={`border p-4 rounded w-full bg-black/50 placeholder-gray-400 ${
                  formErrors.email ? 'border-red-500' : 'border-gray-500'
                }`}
                required
              />
              {formErrors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (touched.password) {
                    const errors = validateField('password', e.target.value);
                    setFormErrors(prev => ({ ...prev, ...errors }));
                  }
                }}
                onBlur={() => handleBlur('password')}
                className={`border p-4 rounded w-full bg-black/50 placeholder-gray-400 ${
                  formErrors.password ? 'border-red-500' : 'border-gray-500'
                }`}
                required
              />
              {formErrors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
              )}
            </div>

            <button 
              type="submit"
              className="bg-red-600 p-4 rounded w-full font-bold text-lg hover:bg-red-700 transition duration-200"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-4">
            New to Netflix?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;