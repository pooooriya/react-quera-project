import { configureStore } from "@reduxjs/toolkit";
import { BasketSlice } from "./features/basket/basket.slice";

export const store = configureStore({
  reducer: {
    basket: BasketSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
