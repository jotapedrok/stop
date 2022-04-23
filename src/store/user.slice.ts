import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',

  initialState: {
    userName: '',
  },

  reducers: {
    setUserName(state, { payload }) {
      state.userName = payload;
    },

    userNameOnExit(state) {
      state.userName = '';
    },
  },
});

export default user.reducer;
export const { setUserName, userNameOnExit } = user.actions;
