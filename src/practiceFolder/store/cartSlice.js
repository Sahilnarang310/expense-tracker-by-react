// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {},
    totalItems: 0,
    loading: false,
    error: null
  },
  reducers: {
    addToCart(state, action) {
      const { id, quantity } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += quantity;
      } else {
        state.items[id] = { quantity };
      }
      state.totalItems += quantity;
    },
    removeFromCart(state, action) {
      const { id } = action.payload;
      state.totalItems -= state.items[id].quantity;
      delete state.items[id];
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const prevQuantity = state.items[id].quantity;
      state.items[id].quantity = quantity;
      state.totalItems += quantity - prevQuantity;
      if (quantity === 0) {
        delete state.items[id];
      }
    },
    fetchCartRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCartSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    fetchCartFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, fetchCartRequest, fetchCartSuccess, fetchCartFailure } = cartSlice.actions;
export default cartSlice.reducer;

export const fetchCartItems = () => async dispatch => {
  dispatch(fetchCartRequest());
  try {
    const response = await axios.get('/api/cart'); // Assuming API endpoint for retrieving cart items
    dispatch(fetchCartSuccess(response.data));
  } catch (error) {
    dispatch(fetchCartFailure(error.message));
  }
};
