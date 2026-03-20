'use client';

import { type ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store';
import { initCart } from '@/store/cart-slice';

export function ReduxProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    store.dispatch(initCart());
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
