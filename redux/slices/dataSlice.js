import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getData: (state, actions) => {
      state.items.push(actions.payload);
    },
  },
});

export const { getData } = dataSlice.actions;

export default dataSlice.reducer;
