import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Product } from '@/lib/server/api-client';

const STORAGE_KEY = 'swag_cart_token';
const STORAGE_EXPIRY_KEY = 'swag_cart_token_expiry';
const TTL_MS = 24 * 60 * 60 * 1000;

export interface CartItem {
  productId: string;
  quantity: number;
  addedAt: string;
  product: Product;
  lineTotal: number;
}

export interface CartState {
  token: string | null;
  expiresAt: number | null;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  currency: string;
  status: 'idle' | 'loading' | 'error';
}

const initialState: CartState = {
  token: null,
  expiresAt: null,
  items: [],
  totalItems: 0,
  subtotal: 0,
  currency: 'USD',
  status: 'idle',
};

// Only creates a new cart if no valid token exists in localStorage.
// Does NOT overwrite persisted Redux state — called only when token is absent.
export const initCart = createAsyncThunk(
  'cart/init',
  async (_, { getState }) => {
    const state = (getState() as { cart: CartState }).cart;

    // Token exists — fetch current cart from API to sync state
    if (state.token && state.expiresAt && Date.now() < state.expiresAt) {
      const res = await fetch('/api/cart', {
        headers: { 'x-cart-token': state.token },
      });

      // Token expired on the server side — fall through to create a new cart
      if (res.ok) {
        const data = await res.json();
        return {
          token: state.token,
          expiresAt: state.expiresAt,
          items: data.data.items,
          totalItems: data.data.totalItems,
          subtotal: data.data.subtotal,
          currency: data.data.currency,
        };
      }
    }

    // No token or expired — create a new cart
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_EXPIRY_KEY);
    }

    const res = await fetch('/api/cart/create', { method: 'POST' });
    if (!res.ok) {
      throw new Error('Failed to create cart');
    }

    const data = await res.json();
    const token: string = data.data.token;
    const expiresAt = Date.now() + TTL_MS;

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, token);
      localStorage.setItem(STORAGE_EXPIRY_KEY, String(expiresAt));
    }

    return {
      token,
      expiresAt,
      items: [],
      totalItems: 0,
      subtotal: 0,
      currency: 'USD',
    };
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(
      state,
      action: PayloadAction<{
        items: CartItem[];
        totalItems: number;
        subtotal: number;
        currency: string;
      }>
    ) {
      state.items = action.payload.items;
      state.totalItems = action.payload.totalItems;
      state.subtotal = action.payload.subtotal;
      state.currency = action.payload.currency;
    },
    clearCart(state) {
      state.token = null;
      state.expiresAt = null;
      state.items = [];
      state.totalItems = 0;
      state.subtotal = 0;
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_EXPIRY_KEY);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload.token;
          state.expiresAt = action.payload.expiresAt;
          state.items = action.payload.items;
          state.totalItems = action.payload.totalItems;
          state.subtotal = action.payload.subtotal;
          state.currency = action.payload.currency;
        }
        state.status = 'idle';
      })
      .addCase(initCart.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
