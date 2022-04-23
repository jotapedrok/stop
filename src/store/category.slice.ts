import { createSlice } from '@reduxjs/toolkit';
import ICategory from '../interfaces/ICategory.interface';

const initialCategories: ICategory[] = [];

const category = createSlice({
  name: 'category',

  initialState: {
    categories: initialCategories,
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
        state.categories = newCategory;
      }
    },

    reset(state) {
      state.categories = [];
    },

    removeAllAnswers(state) {
      state.categories.forEach(c => {
        c.answers = [];
      });
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

    categoriesOnExit(state) {
      state.categories = initialCategories;
    },
  },
});

export default category.reducer;
export const {
  setCategories,
  reset,
  addCategory,
  addAnswers,
  removeAllAnswers,
  categoriesOnExit,
} = category.actions;
