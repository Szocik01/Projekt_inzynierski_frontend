import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import setSingleCookie from "../utils/SetSingleCookie";
import deleteSingleCookie from "../utils/DeleteSingleCookie";

type AuthSliceState = {
  token: string;
  userId: string;
};

type AuthData= AuthSliceState & {
  expiration?: string
}

const initialState: AuthSliceState = {
  token: "",
  userId: "",
};

const authSlice = createSlice({
  name: "Auth slice",
  initialState,
  reducers: {
    addUserData: (state, action: PayloadAction<AuthData>) => {
      if(action.payload.expiration){
        setSingleCookie('token',action.payload.token, new Date(action.payload.expiration))
        setSingleCookie('userId',action.payload.userId, new Date(action.payload.expiration))
      }
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },

    deleteUserData: (state) => {
      deleteSingleCookie('token');
      state = { userId: "", token: "" };
    },
  },
});

export {type AuthSliceState}; 
export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
