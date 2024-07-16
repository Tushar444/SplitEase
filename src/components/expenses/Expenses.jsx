import "./expenses.scss";
import { DebtPercentContext } from "../../context/DebtPercentContext";
import { FriendsListContext } from "../../context/FriendsListContext";
import { useContext, useEffect, useState } from "react";
import { NumberOfFriendsContext } from "../../context/NumberOfFriendsContext";
import CloseIcon from "@mui/icons-material/Close";
import BalanceIcon from "@mui/icons-material/Balance";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { TransactionGraphContext } from "../../context/TransactionGraphContext";

const Expenses = () => {
  const [amount, setAmount] = useState(0);
  const [custom, setCustom] = useState(false);
  const [creditorIndex, setCreditorIndex] = useState(0);

  const { friendsList } = useContext(FriendsListContext);
  let { debtPercentList, setDebtPercentList } = useContext(DebtPercentContext);
  const { N } = useContext(NumberOfFriendsContext);
  let { setTransactionGraph } = useContext(TransactionGraphContext);

  useEffect(() => {
    let initialTransactionGraph = [];
    for (let i = 0; i < N; i++) {
      let temp = [];
      for (let j = 0; j < N; j++) {
        temp.push(0);
      }
      initialTransactionGraph.push(temp);
    }
    setTransactionGraph(initialTransactionGraph);
  }, [N, setTransactionGraph]);

  useEffect(() => {
    setDebtPercentList(Array.from({ length: N }, () => 0));
  }, [setDebtPercentList, N, creditorIndex, custom]);

  const handleEqually = () => {
    setCustom(false);
    const validPercents = debtPercentList.filter(
      (percent) => percent !== -1
    ).length;
    if (validPercents > 0) {
      const equalPercent = 100 / validPercents;
      const updatedList = debtPercentList.map((percent) =>
        percent !== -1 ? equalPercent : percent
      );
      setDebtPercentList(updatedList);
    }
  };

  const handleCustom = () => {
    setCustom(true);
  };

  const handleTransactionGraphChange = () => {
    if (creditorIndex != -1) {
      const updatedRow = debtPercentList.map((debtPercent) => {
        let contri = ((debtPercent === -1 ? 0 : debtPercent) * amount) / 100;
        contri = contri.toFixed(2);
        contri = parseFloat(contri);
        return contri;
      });
      setTransactionGraph((prev) => {
        const newGraph = [...prev];
        newGraph[creditorIndex] = updatedRow;
        return newGraph;
      });
    }
  };

  const handleDebtPercentChange = (index, value) => {
    const updatedValue = Number(value);
    setDebtPercentList((prev) => {
      const newList = [...prev];
      newList[index] = updatedValue;
      return newList;
    });
  };

  const handleDone = () => {
    let sumPercent = debtPercentList.reduce(
      (sum, percent) => (percent !== -1 ? sum + percent : sum),
      0
    );

    sumPercent = parseFloat(sumPercent.toFixed(2));

    if (Math.ceil((sumPercent + Number.EPSILON) * 100) / 100 !== 100) {
      alert("Your percentage contributions did not sum up to 100");
      // window.location.reload();
    } else {
      handleTransactionGraphChange();
    }
  };

  const handleRemove = (index) => {
    setDebtPercentList((prev) => {
      const newList = [...prev];
      newList[index] = -1;
      return newList;
    });
  };

  const handleCreditorIndex = (e) => {
    const index = Number(e.target.value);
    setCreditorIndex(index);
  };

  return (
    <div className="expenses">
      <div className="creditInfo">
        <div>
          <label htmlFor="creditor">Creditor: </label>
          <select name="creditor" onChange={handleCreditorIndex}>
            {friendsList.map((friend, index) => (
              <option key={index} value={`${index}`}>
                {friend}
              </option>
            ))}
          </select>
        </div>
        <div className="amount">
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={amount === 0 ? "" : amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
      </div>
      <hr />
      <div className="debitInfo">
        {friendsList.map((friend, index) => (
          <div className="debtor" key={index}>
            <span>{friend}</span>
            <input
              type="number"
              placeholder="Percentage"
              value={
                debtPercentList[index] !== undefined &&
                debtPercentList[index] !== -1
                  ? debtPercentList[index]
                  : 0
              }
              onChange={(e) => handleDebtPercentChange(index, e.target.value)}
            />
            <button onClick={() => handleRemove(index)}>
              <CloseIcon fontSize="medium" />
            </button>
          </div>
        ))}
        <div className="buttons">
          <div>
            <button className="equally" onClick={handleEqually}>
              <BalanceIcon fontSize="medium" />
            </button>
            <button className="custom" onClick={handleCustom}>
              <EqualizerIcon fontSize="medium" />
            </button>
          </div>
          <button className="done" onClick={handleDone}>
            <CurrencyRupeeIcon fontSize="medium" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
