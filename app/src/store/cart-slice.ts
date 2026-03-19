import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

const STORAGE_KEY = "swag_cart_token";
const STORAGE_EXPIRY_KEY = "swag_cart_token_expiry";
const TTL_MS = 24 * 60 * 60 * 1000;

export interface CartState {
    token: string | null;
    expiresAt: number | null;
    totalItems: number;
    subtotal: number;
    currency: string;
    status: "idle" | "loading" | "error";
}

const initialState: CartState = {
    token: null,
    expiresAt: null,
    totalItems: 0,
    subtotal: 0,
    currency: "USD",
    status: "idle",
};

// Thunk: create cart via proxy route, returns token
export const initCart = createAsyncThunk("cart/init", async () => {
    // Check localStorage first
    if (typeof window !== "undefined") {
        const token = localStorage.getItem(STORAGE_KEY);
        const expiry = localStorage.getItem(STORAGE_EXPIRY_KEY);
        if (token && expiry && Date.now() < Number(expiry)) {
            return { token, expiresAt: Number(expiry) };
        }
    }

    const res = await fetch("/api/cart/create", { method: "POST" });
    if (!res.ok) throw new Error("Failed to create cart");

    const data = await res.json();
    const token: string = data.data.token;
    const expiresAt = Date.now() + TTL_MS;

    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, token);
        localStorage.setItem(STORAGE_EXPIRY_KEY, String(expiresAt));
    }

    return { token, expiresAt };
});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setTotals(state, action: PayloadAction<{ totalItems: number; subtotal: number; currency: string }>) {
            state.totalItems = action.payload.totalItems;
            state.subtotal = action.payload.subtotal;
            state.currency = action.payload.currency;
        },
        clearCart(state) {
            state.token = null;
            state.expiresAt = null;
            state.totalItems = 0;
            state.subtotal = 0;
            if (typeof window !== "undefined") {
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(STORAGE_EXPIRY_KEY);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(initCart.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.expiresAt = action.payload.expiresAt;
                state.status = "idle";
            })
            .addCase(initCart.rejected, (state) => {
                state.status = "error";
            });
    },
});

export const { setTotals, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

