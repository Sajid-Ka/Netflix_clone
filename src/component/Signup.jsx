import { useState, useEffect } from "react";
import { useAuth } from "./Context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.email) setEmail(state.email);
  }, [state]);

  const getFirebaseErrorMessage = (error) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email address is already registered. Please use a different email or sign in.';
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled. Please contact support.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      default:
        return 'An error occurred during sign up. Please try again.';
    }
  };

  const validateField = (name, value, confirmValue = null) => {
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
        } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
          errors.password = "Password must contain at least one letter and one number";
        }
        break;
      case "confirmPassword":
        if (!value) {
          errors.confirmPassword = "Please confirm your password";
        } else if (value !== confirmValue) {
          errors.confirmPassword = "Passwords do not match";
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
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
      errors.password = "Password must contain at least one letter and one number";
    }
    
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    return errors;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    let fieldErrors = {};
    if (field === 'confirmPassword') {
      fieldErrors = validateField(field, confirmPassword, password);
    } else {
      fieldErrors = validateField(field, field === 'email' ? email : password);
    }
    
    setFormErrors(prev => ({ ...prev, ...fieldErrors }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTouched({ email: true, password: true, confirmPassword: true });
    setError(""); 
    
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      try {
        await signup(email, password);
        navigate("/");
      } catch (err) {
        const friendlyError = getFirebaseErrorMessage(err);
        setError(friendlyError);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Navbar />
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <div className="bg-black/90 p-8 rounded-lg max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
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

            <div className="mb-4">
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
                  if (touched.confirmPassword) {
                    const confirmErrors = validateField('confirmPassword', confirmPassword, e.target.value);
                    setFormErrors(prev => ({ ...prev, ...confirmErrors }));
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

            <div className="mb-6">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (touched.confirmPassword) {
                    const errors = validateField('confirmPassword', e.target.value, password);
                    setFormErrors(prev => ({ ...prev, ...errors }));
                  }
                }}
                onBlur={() => handleBlur('confirmPassword')}
                className={`border p-4 rounded w-full bg-black/50 placeholder-gray-400 ${
                  formErrors.confirmPassword ? 'border-red-500' : 'border-gray-500'
                }`}
                required
              />
              {formErrors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
              )}
            </div>

            <button 
              type="submit"
              className="bg-red-600 p-4 rounded w-full font-bold text-lg hover:bg-red-700 transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;