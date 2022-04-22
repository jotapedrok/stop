import { createSlice } from '@reduxjs/toolkit';

const turn = createSlice({
  name: 'turn',

  initialState: {
    turn: 'default',
  },

  reducers: {
    setStop(state) {
      state.turn = 'stop';
    },

    setDefault(state) {
      state.turn = 'default';
    },

    setSum(state) {
      state.turn = 'sum';
    },
  },
});

export default turn.reducer;
export const { setStop, setDefault, setSum } = turn.actions;
