import React from "react";
import "./payment.scss";
import IconClock from "@/components/icons/IconClock";
import { useEffect, useRef, useState } from "react";
import {
  checkPageExpiry,
  checkPaymentStatus,
  checkPaymentTime,
} from "@/services/paymentController";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment-timezone";
import { formatTime } from "@/utils/formatTime";
import { splitThousandSeparator } from "@/utils/splitThousandSeparator";
interface CountDownProps {
  onEnd?: () => void;
}
const NewPayment = ({ onEnd }: CountDownProps) => {
  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false); // Track if the modal is closing
  const urlParams = useSearchParams();
  const [remainingTime, setRemainingTime] = useState("");
  const [selectedUrl, setSelectedUrl] = useState("");
  const [whitelabel, setWhitelabel] = useState(true)
  const [upiData, setUpiData] = useState({
    paytmurl:"",
    gpayurl:"",
    phonepeurl:'',
    upi:""
  })
  const [amount, setAmount] = useState(0)
  const timer = useRef<NodeJS.Timeout>();
  const onEndRef = useRef(onEnd);

  let txId = urlParams.get("txid") || "";
  let token = urlParams.get("token") || "";
  let phonepe = urlParams.get("phonepe") || "";
  let gpay = urlParams.get("gpay") || "";
  let paytm = urlParams.get("paytm") || "";
  let upi = urlParams.get("upi") || "";

  const router = useRouter();

  // let amount = urlParams.get("amount") || 100;
  let redirect = urlParams.get("url");

  // const upiData = {
  //   upi: decodeURIComponent(upi),
  //   phonepeurl: decodeURIComponent(phonepe),
  //   paytmurl: decodeURIComponent(paytm),
  //   gpayurl: decodeURIComponent(gpay),
  // };
  console.log(upiData)
  const [paymentMethods, setPaymentMethods] = useState([
    { icon: "paytm.svg", name: "PayTM", url: upiData.paytmurl, selected: false },
    { icon: "phonepe.svg", name: "PhonePE", url: upiData.phonepeurl },
    { icon: "googlePay.svg", name: "GooglePay", url: upiData.gpayurl },
    { icon: "otherUpi.svg", name: "Other UPI Apps", url: upiData.upi },
  ]);

  const updatePaymentMethods = () => {
    setPaymentMethods([
      { icon: "paytm.svg", name: "PayTM", url: upiData.paytmurl, selected: false },
      { icon: "phonepe.svg", name: "PhonePE", url: upiData.phonepeurl },
      { icon: "googlePay.svg", name: "GooglePay", url: upiData.gpayurl },
      { icon: "otherUpi.svg", name: "Other UPI Apps", url: upiData.upi },
    ]);
  };

  useEffect(() => {
    updatePaymentMethods();
  }, [upiData]);
  
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };

    setVh(); // Initial set
    window.addEventListener('resize', setVh); // Update on window resize

    return () => window.removeEventListener('resize', setVh); // Cleanup
  }, []);

  useEffect(() => {
    if (!token || !txId) return;

    // Function to fetch payment status
    const fetchPaymentStatus = async () => {
      try {
        const response = await checkPaymentStatus(token, txId);
         console.log(response);
        if(response?.responseCode==400)
        {
          router.replace("/expired");
        }
        if (response.responseData === "success") {
          if (redirect != null) {
            window.location.assign(redirect);
            return;
          }
          router.replace("/success");
        } else if (response.responseData === "failed") {
          router.replace("/failed");
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    // Initial call
    fetchPaymentStatus().then();

    // Set up interval to run the function every 15 seconds
    const intervalId = setInterval(fetchPaymentStatus, 1500);

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [token, txId, redirect, router]);

  useEffect(() => {
    checkPageExpiry(token)
      .then((response)=>{
        if(response?.responseCode==400)
        {
          router.replace("/expired");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [token]);

  useEffect(() => {
    if (!txId) {
      router.replace("/expired");
      return
    };
    const fetchData = () => {
      checkPaymentTime(token, txId)
        .then((response) => {
          if (response.responseCode !== 200) {
           
              router.replace("/expired");
            
          }

          const responseData = response?.responseData?.time;
          setWhitelabel(response?.responseData?.whitelabel)
          setUpiData({
            paytmurl:response?.responseData?.urls?.paytm,
            upi:response?.responseData?.urls?.upiUrl,
            phonepeurl:response?.responseData?.urls?.phonepe,
            gpayurl:response?.responseData?.urls?.gpay
          })
          setAmount(response?.responseData?.amount)
          const transactionTime = moment.tz(responseData, "Asia/Kolkata");

          const currentTime = moment();
          const timeDifferenceInMinutes = transactionTime.diff(
            currentTime,
            "minutes"
          );

          if (timeDifferenceInMinutes <= 15) {
            const targetTime = transactionTime
              .add(15, "minutes")
              .toDate()
              .getTime();

            const calculateRemainingTime = () => {
              const currentTime = new Date().getTime();
              const timeDifferenceInSeconds = Math.floor(
                (targetTime - currentTime) / 1000
              );

              if (timeDifferenceInSeconds > 0) {
                const { minutes, seconds } = formatTime(
                  timeDifferenceInSeconds
                );
                setRemainingTime(
                  `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
                );
              } else {
                setRemainingTime("00:00");
                onEndRef.current && onEndRef.current();
              }
            };

            calculateRemainingTime();

            if (timer.current) clearInterval(timer.current);
            timer.current = setInterval(calculateRemainingTime, 1000);
          }
        })
        .catch((error) => {
          // Handle errors
          console.log("error", error);
        });
    };

    fetchData();

    return () => {
      clearInterval(timer.current);
    };
  }, [token, txId]);

  const setSelected = (method: any) => {
    setSelectedUrl(method.url);
    setPaymentMethods((prevMethods) =>
      prevMethods.map(
        (item) =>
          item.name === method.name
            ? { ...item, selected: true } // Select the clicked method
            : { ...item, selected: false } // Deselect all others
      )
    );
  };

  const closeModal = () => {
    setClosing(true); // Trigger the closing animation
    setTimeout(() => {
      setShowModal(false); // Hide the modal after animation
      setClosing(false); // Reset closing state
    }, 300); // Match the animation duration
  };

  return (
    <div className="payment-container">
      {/* Header Section */}
      <div className="payment-header">
        <button onClick={() => router.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 19L8 12L15 5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1>Payment</h1>
      </div>

      {/* Payment Amount Section */}
      <div className="payment-amount">
        <p>{`₹ ${splitThousandSeparator(Number(amount))}`}</p>
        <div className="payment-expiry">
          Payment page expires in{" "}
          <strong>{remainingTime ? remainingTime : 0}</strong>
        </div>
      </div>

      {/* Button and Footer Section */}
      <div className="payment-footer-section" style={{ width: "100%" }}>
        {/* Pay Button */}
        <div className="payment-button">
          <button onClick={() => setShowModal(true)}>Pay via UPI</button>
        </div>
        {/* Footer */}
       {!whitelabel&&<div className="payment-footer">Powered by GSX Solutions</div>}
      </div>

      {/* Modal Section */}
      {showModal && (
        <div
          className={`modal-overlay ${closing ? "fade-out" : ""}`}
          onClick={closeModal}
        >
          <div
            className={`modal ${closing ? "fade-out" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="modal-header">
              <span>Choose UPI App</span>
              <div className="drag-handle"></div>
            </div>

            {/* Modal Content */}
            <div className="modal-content">
              {paymentMethods.map((method, index) => (
                <div
                  className={`payment-method ${method.selected ? "selected" : ""}`}
                  key={index}
                  onClick={() => setSelected(method)}
                >
                  <div className="payment-method-icon">
                    <img src={`/images/${method.icon}`} alt={method.name} />
                  </div>
                  <div className="payment-method-details">
                    <span>{method.name}</span>
                    {/* {method.details && <p>{method.details}</p>} Subtext, if any */}
                  </div>
                  {method.selected ? (
                    <span className="selected-indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17L4 12" />
                      </svg>
                    </span>
                  ) : null}
                </div>
              ))}
              <button
              className="proceed-button"
              onClick={() => {
                // if(window?.navigator?.platform == "iPhone")
                window.location.replace(selectedUrl);
                // else
                // window.location.replace(upiData.upi);
                closeModal();
              }}
            >
              Continue
            </button>
            </div>

            {/* Proceed to Pay Button */}
            {/* <button
              className="proceed-button"
              onClick={() => {
                window.location.replace(selectedUrl);
                closeModal();
              }}
            >
              Proceed to Pay
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPayment;
