"use client";

import { useEffect, type ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { initCart } from "@/store/cart-slice";

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
