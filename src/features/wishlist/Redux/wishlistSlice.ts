import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../../lib/axios";
import { addToWishlist, removeFromWishlist } from "../wishlist.services";
import type { RootState } from "../../../Redux/store";
import { toast } from "react-toastify";
import axios from "axios";

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const isCompleted = state.authuser.isCompleted;

      if (!isCompleted) {
        return [];
      }

      const res = await Axios.get("/users/wishlist");
      return res.data.data.wishlist;
    } catch (err) {
      let errorMessage = "Failed to fetch wishlist";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const addToWishlistThunk = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const isCompleted = state.authuser.isCompleted;

      if (!isCompleted) {
        const message = "User profile is incomplete";
        toast.error(message);
        return rejectWithValue(message);
      }

      await addToWishlist(productId);
      return productId;
    } catch (err) {
      let errorMessage = "Failed to add item to wishlist";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const removeFromWishlistThunk = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const isCompleted = state.authuser.isCompleted;

      if (!isCompleted) {
        const message = "User profile is incomplete";
        toast.error(message);
        return rejectWithValue(message);
      }

      await removeFromWishlist(productId);
      return productId;
    } catch (err) {
      let errorMessage = "Failed to remove item from wishlist";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

interface WishlistItem {
  _id?: string;
  product?: string | { _id?: string };
}

interface WishlistState {
  list: (WishlistItem | string)[];
  status: "idle" | "loading" | "success" | "failed";
  actionStatus: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

const initialState: WishlistState = {
  list: [],
  status: "idle",
  actionStatus: "idle",
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.list = action.payload || [];
        state.status = "success";
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "An error occurred while fetching data";
      })

      .addCase(addToWishlistThunk.pending, (state) => {
        state.actionStatus = "loading";
      })
      .addCase(addToWishlistThunk.fulfilled, (state, action) => {
        state.actionStatus = "success";

        const exists = state.list.some(
          (item) => {
            if (typeof item === "string") return item === action.payload;
            return item._id === action.payload || item.product === action.payload || (typeof item.product === "object" && item.product?._id === action.payload);
          }
        );
        if (!exists) {
          state.list.push(action.payload);
        }
      })
      .addCase(addToWishlistThunk.rejected, (state) => {
        state.actionStatus = "failed";
      })

      .addCase(removeFromWishlistThunk.pending, (state) => {
        state.actionStatus = "loading";
      })
      .addCase(removeFromWishlistThunk.fulfilled, (state, action) => {
        state.actionStatus = "success";
        state.list = state.list.filter((item) => {
          if (typeof item === "string") return item !== action.payload;
          const productId = typeof item.product === "object" ? item.product?._id : item.product;
          const itemId = item._id || productId;
          return itemId !== action.payload;
        });
      })
      .addCase(removeFromWishlistThunk.rejected, (state) => {
        state.actionStatus = "failed";
      });
  },
});

export default wishlistSlice.reducer;