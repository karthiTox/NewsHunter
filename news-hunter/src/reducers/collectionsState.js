import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "collectionsState",
  initialState: [],
  reducers: {
    addCollection: (state, action) => {
      return [...state, action.payload];
    },
    removeCollection: (state, action) => {
      const newState = [...state];
      for(var i=0; i < newState.length; i++) {
        if(newState[i].colId == action.payload)
        {
          newState.splice(i,1);
        }
     }
     return newState;
    },
    setCollectionsState: (state, action) => {
      return action.payload;      
    },    
  },
});

export const collectionsStateActions = slice.actions;
export const collectionsState = slice.reducer;
