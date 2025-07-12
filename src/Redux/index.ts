import { configureStore } from '@reduxjs/toolkit';
import { userStateSlice } from './Slices/userSlice';
import cartReducer from './Slices/cartSlice';

export const store = configureStore({
  reducer: {
    user: userStateSlice.reducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
