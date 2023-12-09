import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import pageEventsReducer from "./pageEventsSlice";

export const store = configureStore({
    reducer: {
      auth: authSliceReducer,
      pageEvents: pageEventsReducer,
    },
});

export type ReduxAppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;