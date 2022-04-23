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
      const found = state.categories.find(
        selectedCategory =>
          selectedCategory.category === payload.category.category,
      );
      if (!found) {
        const newCategory = [...state.categories, payload];
        console.log('newCategory', newCategory);
        state.categories = newCategory;
      }
    },

    reset(state) {
      state.categories = [];
    },

    addAnswers(state, { payload }) {
      const { category: payloadCategory, answer, score } = payload;
      const found = state.categories.find(
        selectedCategory => selectedCategory.category === payloadCategory,
      );
      if (found) {
        const i = state.categories.indexOf(found);
        state.categories[i].answers.push({ score, answer });
      }
    },
  },
});

export default category.reducer;
export const { setCategories, reset, addCategory, addAnswers } =
  category.actions;
