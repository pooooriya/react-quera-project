import { ActionType } from "../../store";

export enum BasketTypes {
  AddToBasket,
  RemoveFromBasket,
  RemoveAllBasket
}

export const BasketReducer = (
  state: any[],
  action: ActionType<BasketTypes>
) => {
  switch (action.type) {
    case BasketTypes.AddToBasket: {
      const alreadyExist = state.find((x) => x.id === action.payload.id);

      if (alreadyExist) {
        const newBasket = state.map((item) => {
          // az ghabl dar basket vojood darad
          if (item.id === action.payload.id) {
            item.Count += 1;
          }
          return item;
        });

        return newBasket;
      }
      return [...state, { ...action.payload, Count: 1 }];
    }
    case BasketTypes.RemoveFromBasket: {
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
    }
    case BasketTypes.RemoveAllBasket:
      return [];
    default:
      return state;
  }
};
