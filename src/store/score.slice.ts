import { createSlice } from '@reduxjs/toolkit';

const score = createSlice({
  name: 'score',

  initialState: {
    scores: 0,
  },

  reducers: {
    increment(state, { payload }) {
      state.scores += payload;
    },

    reset(state) {
      state.scores = 0;
    },

    setScores(state, { payload }) {
      state.scores = payload;
    },
  },
});

export default score.reducer;
export const { increment, reset } = score.actions;
