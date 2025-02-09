import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import navigationReducer from "./slices/navigationSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    navigation: navigationReducer,
  },
});

// 스토어의 타입을 추론하여 내보내기
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
