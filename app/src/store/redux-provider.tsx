"use client";

import { useEffect, type ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { initCart } from "@/store/cart-slice";

export function ReduxProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        store.dispatch(initCart());
    }, []);

    return <Provider store={store}>{children}</Provider>;
}

