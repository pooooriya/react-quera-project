import { createSlice, current } from "@reduxjs/toolkit";
export const BasketSlice = createSlice({
  name: "basket",
  initialState: [],
  reducers: {
    AddToBasket: (currentState, action) => {
      const state = current(currentState);
      const copyState = [...state];
      const alreadyExist = copyState.find((x) => x.id === action.payload.id);
      if (alreadyExist) {
        state.forEach((item) => (item.Count += 1));
        return copyState;
      } else {
        copyState.push({ ...action.payload, Count: 1 });
      }
      return copyState;
    },
    RemoveFromBasket: (currentState, action) => {
      const state = current(currentState);
      const alreadyExist = state.find((x) => x.id === action.payload);
      if (alreadyExist) {
        const basketWithOutElement = state.filter(
          (x) => x.id != action.payload
        );
        if (alreadyExist?.Count > 1) {
          const newBasket = state.map((item) => {
            // az ghabl dar basket vojood darad
            if (item.id === action.payload) {
              item.Count -= 1;
            }
            return item;
          });
          return newBasket;
        }
        return basketWithOutElement;
      }
      return state;
    },
    RemoveAllBasket: () => {
      return [];
    }
  }
});

export const { AddToBasket, RemoveAllBasket, RemoveFromBasket } =
  BasketSlice.actions;
