import { createSlice } from '@reduxjs/toolkit';

const exemple = createSlice({
  name: 'exemple',

  initialState: {
    counter: 0
  },

  reducers: {
    increment (state) {
      state.counter += 1
    },

    decrement (state) {
      state.counter -= 1
    }
  }
});

export default exemple.reducer;
export const {
  increment,
  decrement,
} = exemple.actions;