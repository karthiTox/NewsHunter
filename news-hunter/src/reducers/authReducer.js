import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "authReducer",
  initialState: {    
    email: "",  
  },
  reducers: {
    changeEmail: (state, action) => {      
      state.email = action.payload;
      return state;
    },    
  },
});

export const authActions = slice.actions;
export const authReducer = slice.reducer;
