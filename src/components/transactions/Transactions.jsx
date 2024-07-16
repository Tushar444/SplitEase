import "./transactions.scss";
import { useContext, useEffect, useState } from "react";
import { FriendsListContext } from "../../context/FriendsListContext";
import { useTransactionSolution } from "../../utils/splitease";
import UPIPaymentQRCode from "../upiQR/UPIPaymentQRCode";

const Transactions = () => {
  const [payment, setPayment] = useState({ index: null, showInput: false });
  const [QR, setQR] = useState({ index: null, showQR: false });
  const [upi, setUpi] = useState("");

  const { friendsList } = useContext(FriendsListContext);

  const { executeSolution, ans } = useTransactionSolution();

  executeSolution();

  const handlePayNowClick = (index) => {
    if (index !== payment.index) {
      setQR({ index: null, showQR: false });
    }
    setPayment({ index, showInput: true });
  };

  const handleChange = (e, index) => {
    if (e.key === "Enter") {
      setPayment({ index: null, showInput: false });
      setQR({ index: index, showQR: true });
    } else {
      setUpi(e.target.value);
    }
  };

  return (
    <div className="transactions">
      {ans.map((row, index) => {
        return (
          <div key={index} className="transaction">
            <div className="info">
              <span className="name">{friendsList[row[0]]}</span> has to pay{" "}
              <span className="amount">{row[1]}</span> to{" "}
              <span className="name">{friendsList[row[2]]}</span>
            </div>
            {(!payment.showInput || payment.index !== index) && (
              <button onClick={() => handlePayNowClick(index)}>Pay now</button>
            )}
            {payment.showInput && payment.index === index && (
              <input
                type="text"
                className="upi"
                placeholder="UPI ID"
                onKeyDown={(e) => handleChange(e, index)}
              />
            )}
            <div className="QR">
              {QR.showQR && QR.index === index && upi !== "" && (
                <UPIPaymentQRCode upiID={upi} amount={row[1]} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Transactions;
