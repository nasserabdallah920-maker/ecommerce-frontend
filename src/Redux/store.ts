import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "../features/wishlist/Redux/wishlistSlice";
import authuserReducer from "../features/auth/Redux/authSlice";

export const store = configureStore({
  reducer: { wishlist: wishlistReducer, authuser: authuserReducer },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
