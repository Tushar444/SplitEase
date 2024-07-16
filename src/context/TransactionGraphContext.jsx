import { createContext, useState } from "react";

export const TransactionGraphContext = createContext();

export const TransactionGraphContextProvider = ({ children }) => {
  const [transactionGraph, setTransactionGraph] = useState([]);

  return (
    <TransactionGraphContext.Provider
      value={{ transactionGraph, setTransactionGraph }}
    >
      {children}
    </TransactionGraphContext.Provider>
  );
};
