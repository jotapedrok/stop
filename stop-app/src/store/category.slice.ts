import { createSlice } from '@reduxjs/toolkit';
import ICategory from '../interfaces/ICategory.interface';

const CategoriesArray: ICategory[] = [];

const category = createSlice({
  name: 'category',

  initialState: {
    categories: CategoriesArray,
  },

  reducers: {
    setCategories(state, { payload }) {
      state.categories = payload;
    },

    addCategory(state, { payload }) {
      const newCategory = [...state.categories, payload];
      state.categories = newCategory;
    },

    reset(state) {
      state.categories = [];
    },
  },
});

export default category.reducer;
export const { setCategories, reset, addCategory } = category.actions;
