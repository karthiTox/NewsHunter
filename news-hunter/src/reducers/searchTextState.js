import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "searchTextState",
  initialState:"",
  reducers: {
    setSearchText: (state, action) => {
      return action.payload;      
    },    
  },
});

export const searchTextStateActions = slice.actions;
export const searchTextState = slice.reducer;
