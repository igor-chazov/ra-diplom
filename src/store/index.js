import { configureStore } from '@reduxjs/toolkit';
import topSalesSlice from '../reducers/topSalesSlice';
import catalogSlice from '../reducers/catalogSlice';
import productSlice from '../reducers/productSlice';
import cartSlice from '../reducers/cartSlice';
import { save } from '../api/localStorage';

const store = configureStore({
  reducer: {
    topSalesSlice,
    catalogSlice,
    productSlice,
    cartSlice,
  },
});

store.subscribe(() => {
  save("cart", store.getState().cartSlice.items);
});

export default store;
