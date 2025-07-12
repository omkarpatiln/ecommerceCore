import { RootState } from '../Redux';

export const isProductInCart = (id: number) => (state: RootState) =>
  state.cart.items.some(item => item.id === id);
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectTotalCartQuantity = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
