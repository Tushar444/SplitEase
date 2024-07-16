import { createContext, useContext } from "react";
import { FriendsListContext } from "./FriendsListContext";

export const NumberOfFriendsContext = createContext();

export const NumberOfFriendsContextProvider = ({ children }) => {
  const { friendsList } = useContext(FriendsListContext);

  const N = friendsList.length;

  return (
    <NumberOfFriendsContext.Provider value={{ N }}>
      {children}
    </NumberOfFriendsContext.Provider>
  );
};
