import QRCode from "qrcode.react";

const UPIPaymentQRCode = ({ upiID, amount }) => {
  const upiURL = `upi://pay?pa=${encodeURIComponent(
    upiID
  )}&am=${encodeURIComponent(amount)}&cu=INR`;

  return (
    <div>
      <QRCode value={upiURL} size={128} />
      <p>UPI ID: {upiID}</p>
      <p>Amount: ₹{amount}</p>
    </div>
  );
};

export default UPIPaymentQRCode;
