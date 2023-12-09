import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PageEventsSliceState = {
  isScrolled: boolean;
};


const initialState: PageEventsSliceState = {
  isScrolled: false,
};

const pageEventsSlice = createSlice({
  name: "Page events slice",
  initialState,
  reducers: {
    setIsScrolled(state, action: PayloadAction<boolean>) {
      state.isScrolled = action.payload;
    },
  },
});

export {type PageEventsSliceState}; 
export const PageEventsSliceActions = pageEventsSlice.actions;
export default pageEventsSlice.reducer;
