import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import characters from './characters/slice'

export const store = configureStore({
  reducer: {
    characters,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
