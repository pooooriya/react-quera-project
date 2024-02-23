import { createContext, useState } from "react";
import { Food } from "../@types/api.types";

type AppContextState = {
  basket?: Food[];
  setBasket?: React.Dispatch<React.SetStateAction<Food[]>>;
};

export const AppContext = createContext<AppContextState>({});

interface AppProviderState extends React.PropsWithChildren {}

export const AppProvider: React.FC<AppProviderState> = ({
  children
}): JSX.Element => {
  const [basket, setBasket] = useState<Food[]>([]);
  return (
    <AppContext.Provider value={{ basket, setBasket }}>
      {children}
    </AppContext.Provider>
  );
};
