import { createSelector, createSlice } from "@reduxjs/toolkit";

export const colors = ['blue','orange','yellow','green','red'];

export const capatalize = (word) => {
   if(word != null | word != undefined) {
      const str = word.charAt(0).toUpperCase();
      return str.concat(word.slice(1))   
   }
   
}


export const status = {
   all: "All",
   active: "UnComplete",
   complete: "Complete",

}

const initialState = {
   status: status.all,
   colors: [],
}

const filterSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      statusChange: (state, action) => {
         state.status = action.payload;
      },
      colorChange: (state, action) => {
         if(state.colors.includes(action.payload)) {
            const index = state.colors.indexOf(action.payload);
            state.colors.splice(index,1);
         } else {
            state.colors.push(action.payload);
         }
      },
      
      
   }
})

export const {statusChange, colorChange} = filterSlice.actions;

export default filterSlice.reducer;


export const selectStatus = createSelector(
   (state) => state.filters,
   state => state.status
)

