import { createSlice, current } from "@reduxjs/toolkit";
export const BasketSlice = createSlice({
  name: "basket",
  initialState: [],
  reducers: {
    AddToBasket: (state, action) => {
      const alreadyExist = state.find((x) => x.id === action.payload.id);
      if (alreadyExist) {
        alreadyExist.Count += 1;
      } else {
        state.push({ ...action.payload, Count: 1 });
      }
    },
    RemoveFromBasket: (state, action) => {
      const alreadyExist = state.find((x) => x.id === action.payload);
      if (alreadyExist) {
        console.log(alreadyExist.Count);
        if (alreadyExist.Count > 1) {
          alreadyExist.Count -= 1;
        } else {
          return state.filter((x) => x.id !== action.payload);
        }
      }
    },
    RemoveAllBasket: () => {
      return [];
    }
  }
});

export const { AddToBasket, RemoveAllBasket, RemoveFromBasket } =
  BasketSlice.actions;
