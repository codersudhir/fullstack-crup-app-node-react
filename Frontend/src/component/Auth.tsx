import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { signUpUser, signInUser, signOut } from '../redux/authSlice';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
const Auth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading, error ,success } = useSelector((state: RootState) => state.auth);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch(startLoading());

    try {
      if (isSignUp) {
        // Simulate successful signup
        const newUser = { email, password };
        dispatch(signUpUser(newUser));
        // toast.success('Registration successful! You can now sign in.');
        setIsSignUp(false);
      } else {
        // Simulate sign in
        if (!email || !password) {
          throw new Error('Invalid credentials');
        }
        dispatch(signInUser({ email, password }));
        // Extract token from response
          const token = user?.tokens?.[0].token
            // Store token in cookies securely (expires in 7 days)
           Cookies.set('token', token, { expires: 7, secure: false, sameSite: 'Strict', path: '/' });
      
        // toast.success('Signed in successfully!');
          window.location.href="/task"
      }
    } catch (error: any) {
      console.log("err",error)
      toast.error(error.message);
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
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
