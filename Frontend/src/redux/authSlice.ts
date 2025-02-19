import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { SignInUser, SigunUpUser } from '../apis/api'; // Fix typo in import
import toast from 'react-hot-toast';

// User interface
export interface User {
  email: string;
  password: string;
}

// Authentication state
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  success: null,
};

// Async Thunk for Sign Up
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await SigunUpUser(user);

      if (response.status === 400 || response.status === 404) {
        toast.error(response.response.data.message); // Display toast
        return rejectWithValue(response.response.data.message);
      }

      toast.success('Registration successful! You can now sign in.');
      return response.data; // Assuming API returns user object
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Signup failed';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await SignInUser(user);

      if (response.status === 400 || response.status === 404) {
        toast.error(response.response.data.message);
        return rejectWithValue(response.data.message);
      }

      toast.success('Signed in successfully!');


      return response.user; // Ensure API returns expected user object
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      return rejectWithValue(errorMessage);
    }
  }
);

// Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.error = null;
      state.success = null;
      state.loading = false;
    },
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Sign Up
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
        state.success = 'Signup successful!';
      })
      .addCase(signUpUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Handle Sign In
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(signInUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload;
        state.loading = false;
        state.success = 'Login successful!';
      })
      .addCase(signInUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { signOut, clearMessages } = authSlice.actions;
export default authSlice.reducer;
