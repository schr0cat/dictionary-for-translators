import { createSlice } from '@reduxjs/toolkit';

export interface LanguagePareSliceType {
  currentPare: string | null
};

const initialState: LanguagePareSliceType = {
  currentPare: null
};

const languagePareSlice = createSlice({
  name: 'languagePare',
  initialState,

  reducers: {
    setPare(state, action) {
      state.currentPare = action.payload
    }
  }
});

export const { setPare } = languagePareSlice.actions;
export const languagePareReducer = languagePareSlice.reducer;