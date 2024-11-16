import React from "react";
import "./status.scss";

const PaymentStatus = ({ status }: { status: "success" | "failure" }) => {
  const isSuccess = status === "success";

  return (
    <div className="status-container">
      <div
        className={`status-icon ${
          isSuccess ? "status-success" : "status-failure"
        }`}
      >
        {isSuccess ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20 6L9 17L4 12"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <h1 className="status-title">
        {isSuccess ? "Payment Successful" : "Payment Failed"}
      </h1>
      <p className="status-message">
        {isSuccess
          ? "Awesome! Your payment has been processed successfully."
          : "Your payment couldn't be completed. Please try again."}
      </p>
    </div>
  );
};

export default PaymentStatus;
