import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type StatusValues = "loading" | "ready" | "error";

export interface AuthSliceType {
  user: { id: number, display_name: string } | null,
  status: StatusValues
};

const initialState: AuthSliceType = {
  user: null,
  status: 'loading'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setUser(state, action: PayloadAction<AuthSliceType['user']>) {
      state.user = action.payload;
    },

    setStatus(state, action: PayloadAction<AuthSliceType['status']>) {
      state.status = action.payload;
    }
  }
})

export const { setUser, setStatus } = authSlice.actions;
export const authReducer = authSlice.reducer;