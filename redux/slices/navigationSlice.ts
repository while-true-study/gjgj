// src/slices/navigationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  currentPage: number; // 1: home, 2: category, 3: mypage
}

const initialState: NavigationState = {
  currentPage: 1, // home 1
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = navigationSlice.actions;
export default navigationSlice.reducer;
