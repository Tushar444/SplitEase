import { createContext, useContext, useState } from "react";
import { NumberOfFriendsContext } from "./NumberOfFriendsContext";

export const DebtPercentContext = createContext();

export const DebtPercentContextProvider = ({ children }) => {
  const { N } = useContext(NumberOfFriendsContext);

  const [debtPercentList, setDebtPercentList] = useState(
    Array.from({ length: N }, () => 0)
  );

  return (
    <DebtPercentContext.Provider
      value={{ debtPercentList, setDebtPercentList }}
    >
      {children}
    </DebtPercentContext.Provider>
  );
};
