import { configureStore } from '@reduxjs/toolkit';
import exemple from './exemple.store';

const store = configureStore({
  reducer: {
    exemple: exemple
  }
});

export type RootState = ReturnType<typeof store.getState>
export default store