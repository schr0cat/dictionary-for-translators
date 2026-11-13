import { configureStore } from '@reduxjs/toolkit';
import { setUser, setStatus, authReducer } from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

export { store, setUser, setStatus };