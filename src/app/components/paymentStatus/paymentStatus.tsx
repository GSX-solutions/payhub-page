import React from "react";
import "./status.scss";

const PaymentStatus = ({
  status,
}: {
  status: "success" | "failure" | "expired";
}) => {
  const isSuccess = status === "success";
  const isFailure = status === "failure";
  const isExpired = status === "expired";

  return (
    <div className="status-container">
      <div
        className={`status-icon ${
          isSuccess
            ? "status-success"
            : isFailure
            ? "status-failure"
            : "status-expired"
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
        ) : isFailure ? (
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
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <path
              d="M12 7V12L15 14"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <h1 className="status-title">
        {isSuccess
          ? "Payment Successful"
          : isFailure
          ? "Payment Failed"
          : "Payment Expired"}
      </h1>
      <p className="status-message">
        {isSuccess
          ? "Awesome! Your payment has been processed successfully."
          : isFailure
          ? "Your payment couldn't be completed. Please try again."
          : "Your payment session has expired. Please initiate a new payment."}
      </p>
    </div>
  );
};

export default PaymentStatus;
