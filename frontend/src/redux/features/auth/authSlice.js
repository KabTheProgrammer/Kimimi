// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  token: null, // Include token in the initial state if needed
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload; // Adjust to your response structure
      state.userInfo = user;
      state.token = token; // Store the token in state
      localStorage.setItem('userToken', token); // Save the token in localStorage if desired
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem('userToken'); // Remove token from localStorage on logout
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
