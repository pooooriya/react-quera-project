import { createContext } from "react";
import { Food } from "../@types/api.types";

type AppContextState = {
  basket?: any[];
  setBasket?: React.Dispatch<React.SetStateAction<Food[]>>;
};

export const AppContext = createContext<AppContextState>({});
