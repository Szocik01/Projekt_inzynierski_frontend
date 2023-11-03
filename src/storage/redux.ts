import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";

export const store = configureStore({
    reducer: {
      auth: authSliceReducer,
    },
});

export type ReduxAppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;