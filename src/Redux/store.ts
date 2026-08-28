import { configureStore } from "@reduxjs/toolkit";
import authuserReducer from "../features/auth/Redux/authSlice";

export const store = configureStore({
  reducer: { authuser: authuserReducer },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
