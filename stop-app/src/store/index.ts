import { configureStore } from '@reduxjs/toolkit';
import ScoreReducer from './score.slice';
import ThemesReducer from './category.slice';
import UserReducer from './user.slice';
import TurnReducer from './turn.slice';

const store = configureStore({
  reducer: {
    score: ScoreReducer,
    categories: ThemesReducer,
    user: UserReducer,
    turn: TurnReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
