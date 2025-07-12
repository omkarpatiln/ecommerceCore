import { RootState } from '../Redux';

export const isProductInCart = (id: number) => (state: RootState) =>
  state.cart.items.some(item => item.id === id);
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectProductQuantityById = (id: number) => (state: RootState) => {
  const item = state.cart.items.find(item => item.id === id);
  return item ? item.quantity : 0;
};
