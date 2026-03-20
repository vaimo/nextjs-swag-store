'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart, initCart } from '@/store/cart-slice';
import { useCallback } from 'react';

type CartFetchOptions = RequestInit & { skipTokenCheck?: boolean };

/**
 * Returns a `cartFetch` helper that:
 * 1. Injects the current cart token as `x-cart-token`.
 * 2. On 401/403 (expired token), clears the cart, creates a new one,
 *    and retries the request once with the fresh token.
 */
export function useCartFetch() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.cart.token);

  const cartFetch = useCallback(
    async (url: string, options: CartFetchOptions = {}): Promise<Response> => {
      const makeRequest = async (t: string): Promise<Response> => {
        return fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
            'x-cart-token': t,
          },
        });
      };

      if (!token) {
        throw new Error('No cart token available');
      }

      let res = await makeRequest(token);

      // Token expired — clear, re-create, retry once
      if (res.status === 401 || res.status === 403 || res.status === 404) {
        dispatch(clearCart());
        const action = await dispatch(initCart());

        if (initCart.fulfilled.match(action) && action.payload?.token) {
          res = await makeRequest(action.payload.token);
        }
      }

      return res;
    },
    [token, dispatch]
  );

  return { cartFetch, token };
}

