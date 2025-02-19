import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { signUpUser, signInUser, signOut } from '../redux/authSlice';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading, error ,success } = useSelector((state: RootState) => state.auth);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate =useNavigate()
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isSignUp) {
        const newUser = { email, password };
        await dispatch(signUpUser(newUser));
        setIsSignUp(false);
      } else {
        if (!email || !password) {
          throw new Error('Invalid credentials');
        }
  
        // Wait for sign-in response
        const response = await dispatch(signInUser({ email, password }));
  
        // Extract user data from the response payload
        const user = response?.payload;  // Ensure this matches your Redux setup
        const token = user?.tokens?.[0]?.token;
  
        if (token) {
          Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict', path: '/' });
          navigate('/task'); // Redirect after successful login
        } else {
          throw new Error('Authentication failed. Please try again.');
        }
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || 'Something went wrong.');
    }
  };
  


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-sm border ring-blue-500 px-3 py-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-sm border ring-blue-500 px-3 py-3"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full border  bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-500">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
