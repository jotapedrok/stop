import { createSlice } from '@reduxjs/toolkit';
import ITheme from '../interfaces/ITheme.interface';

const ThemeArray: ITheme[] = [];

const themes = createSlice({
  name: 'themes',

  initialState: {
    themes: ThemeArray,
  },

  reducers: {
    setThemes(state, { payload }) {
      state.themes = payload;
    },

    addTheme(state, { payload }) {
      const newThemes = [...state.themes, payload];
      state.themes = newThemes;
    },

    reset(state) {
      state.themes = [];
    },
  },
});

export default themes.reducer;
export const { setThemes, reset, addTheme } = themes.actions;
