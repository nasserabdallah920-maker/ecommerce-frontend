import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

interface InitState {
  role: "user" | "admin";
  token: string | null;
  id: string | null;
}

const initialState: InitState = {
  role: "user",
  token: null,
  id: null,
};

const authSlice = createSlice({
  name: "user",

  initialState: {
    initialState,
    isCompleted: false,
  },

  reducers: {
    saveUser: (state, action: PayloadAction<InitState>) => {
      state.isCompleted = true;
      state.initialState = action.payload;
    },

    deleteUser: (state) => {
      state.isCompleted = false;
      state.initialState = initialState;
    },

    saveToken: (state, action: PayloadAction<string>) => {
      state.initialState.token = action.payload;
    },
  },
});

export const { saveUser, deleteUser, saveToken } = authSlice.actions;

export default authSlice.reducer;