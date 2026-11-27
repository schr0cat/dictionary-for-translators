import { configureStore } from '@reduxjs/toolkit';
import { setUser, setStatus, authReducer } from './slices/authSlice';
import { setPare, languagePareReducer } from './slices/languagePareSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    languagePare: languagePareReducer
  }
});

export { store, setUser, setStatus, setPare };