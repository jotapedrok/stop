import { createSlice } from '@reduxjs/toolkit';

const score = createSlice({
  name: 'score',

  initialState: {
    scores: 15,
  },

  reducers: {
    increment(state, { payload }) {
      state.scores += payload;
    },

    reset(state) {
      state.scores = 0;
    },
  },
});

export default score.reducer;
export const { increment, reset } = score.actions;
