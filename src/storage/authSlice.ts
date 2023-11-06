import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthSliceState = {
  token: string;
  userId: string;
};


const initialState: AuthSliceState = {
  token: "",
  userId: "",
};

const authSlice = createSlice({
  name: "Auth slice",
  initialState,
  reducers: {
    addUserData: (state, action: PayloadAction<AuthSliceState>) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },

    deleteUserData: (state) => {
      state = { userId: "", token: "" };
    },
  },
});

export {type AuthSliceState}; 
export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
