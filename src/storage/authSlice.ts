import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  token: string;
  id: string;
};

const initialState: UserState = {
  token: "",
  id: "",
};

const authSlice = createSlice({
  name: "Auth slice",
  initialState,
  reducers: {
    addUserData: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
    },

    deleteUserData: (state) => {
      state = { id: "", token: "" };
    },
  },
});

export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
