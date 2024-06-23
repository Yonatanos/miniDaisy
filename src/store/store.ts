import { configureStore } from '@reduxjs/toolkit';
import { packagesReducer } from '@/slices/packagesSlice';

export const store = configureStore({
  reducer: {
    packages: packagesReducer,
  },
});

export const dispatch = store.dispatch;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
