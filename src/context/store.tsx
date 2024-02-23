// Flux
// Context => Flux

import { createContext, useReducer } from "react";
import { BasketReducer } from "./reducers/basket";

export type ActionType<T, K = any> = {
  type: T;
  payload?: K;
};

export interface IntialStateTypes {
  basket: any[];
}

export const intialState: IntialStateTypes = {
  basket: []
};

export type AppContextState = {
  state: IntialStateTypes;
  dispatch: any;
};

export const AppContext = createContext<AppContextState>({
  state: intialState,
  dispatch: () => null
});

interface AppProviderState extends React.PropsWithChildren {}

const combineReducer = (
  { basket }: IntialStateTypes,
  action: ActionType<any>
) => ({
  basket: BasketReducer(basket, action)
});

export const AppProvider: React.FC<AppProviderState> = ({
  children
}): JSX.Element => {
  const [state, dispatch] = useReducer(combineReducer, intialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
