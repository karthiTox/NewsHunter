import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "mappingsState",
  initialState: {},
  reducers: {
    addMappings: (state, action) => {
      let result = {...state};
      action.payload.forEach(v => result = {...result, ...v});
      return result;
    },
    removeMappingsByNewsId: (state, action) => {
      let result = {...state};
      const newsId = action.payload;
      delete result[newsId];
      return result;
    },
    removeMappingsByColId: (state, action) => {
      let result = {...state};
      const colId = action.payload;
      
      Object.keys(result).forEach(newsId => {
        if(result[newsId] == colId) delete result[newsId];
      })

      return result;
    },
    setMappingsState: (state, action) => {
      return action.payload;      
    },    
  },
});

export const mappingsStateActions = slice.actions;
export const mappingsState = slice.reducer;
