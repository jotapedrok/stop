import { configureStore } from '@reduxjs/toolkit';
import ScoreReducer from './score.slice';
import ThemesReducer from './themes.slice';
import UserReducer from './user.slice';

const store = configureStore({
  reducer: {
    score: ScoreReducer,
    themes: ThemesReducer,
    user: UserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;