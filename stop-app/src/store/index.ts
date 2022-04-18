import { configureStore } from '@reduxjs/toolkit';
import ScoreReducer from './score.slice';

const store = configureStore({
  reducer: {
    score: ScoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
