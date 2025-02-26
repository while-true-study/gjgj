import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import navigationReducer from "./slices/navigationSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    navigation: navigationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
