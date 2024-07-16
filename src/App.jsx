import "./App.css";
import Friends from "./components/friends/Friends";
import Expenses from "./components/expenses/Expenses";
import Transactions from "./components/transactions/Transactions";
import { FriendsListContextProvider } from "./context/FriendsListContext";
import { DebtPercentContextProvider } from "./context/DebtPercentContext";
import { NumberOfFriendsContextProvider } from "./context/NumberOfFriendsContext";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCardIcon from "@mui/icons-material/AddCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useState } from "react";
import { TransactionGraphContextProvider } from "./context/TransactionGraphContext";

function App() {
  const [friends, setFriends] = useState(true);
  const [expenses, setExpenses] = useState(false);
  const [transactions, setTransactions] = useState(false);

  const handleFriends = () => {
    setFriends(true);
    setExpenses(false);
    setTransactions(false);
  };

  const handleExpenses = () => {
    setFriends(false);
    setExpenses(true);
    setTransactions(false);
  };

  const handleTransactions = () => {
    setFriends(false);
    setExpenses(false);
    setTransactions(true);
  };

  return (
    <div className="container">
      <div className="buttons">
        <button className="friends-btn" onClick={handleFriends}>
          <GroupAddIcon fontSize="large" />
          FRIENDS
        </button>
        <button className="expenses-btn" onClick={handleExpenses}>
          <AddCardIcon fontSize="large" />
          EXPENSES
        </button>
        <button className="transactions-btn" onClick={handleTransactions}>
          <AccountBalanceIcon fontSize="large" />
          TRANSACTIONS
        </button>
      </div>
      <hr />
      <FriendsListContextProvider>
        <NumberOfFriendsContextProvider>
          <DebtPercentContextProvider>
            <TransactionGraphContextProvider>
              {friends && <Friends />}
              {expenses && <Expenses />}
              {transactions && <Transactions />}
            </TransactionGraphContextProvider>
          </DebtPercentContextProvider>
        </NumberOfFriendsContextProvider>
      </FriendsListContextProvider>
    </div>
  );
}

export default App;
