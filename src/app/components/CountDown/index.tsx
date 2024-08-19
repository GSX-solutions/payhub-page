"use client";
import IconClock from "@/components/icons/IconClock";
import { useEffect, useRef, useState } from "react";
import { checkPaymentTime } from "@/services/paymentController";
import { useSearchParams } from "next/navigation";
import moment from "moment-timezone";
import { formatTime } from "@/utils/formatTime";

interface CountDownProps {
  onEnd?: () => void;
}

function CountDown({ onEnd }: CountDownProps) {
  const urlParams = useSearchParams();
  const [remainingTime, setRemainingTime] = useState("");
  const timer = useRef<NodeJS.Timeout>();
  const onEndRef = useRef(onEnd);

  let txId = urlParams.get("txid") || "";
  let token = urlParams.get("token") || "";

  useEffect(() => {
    if (!txId) return;
    const fetchData = () => {
      checkPaymentTime(token, txId)
        .then((response) => {
          if (response.responseCode !== 200) {
            // Handle the case where responseCode is not 200
            // navigate("/expired");
            // return alert("Link Expired");
          }

          const responseData = response.responseData;
          const transactionTime = moment.tz(responseData, "Asia/Kolkata");

          const currentTime = moment();
          const timeDifferenceInMinutes = transactionTime.diff(
            currentTime,
            "minutes",
          );

          if (timeDifferenceInMinutes <= 15) {
            const targetTime = transactionTime
              .add(15, "minutes")
              .toDate()
              .getTime();

            const calculateRemainingTime = () => {
              const currentTime = new Date().getTime();
              const timeDifferenceInSeconds = Math.floor(
                (targetTime - currentTime) / 1000,
              );

              if (timeDifferenceInSeconds > 0) {
                const { minutes, seconds } = formatTime(
                  timeDifferenceInSeconds,
                );
                setRemainingTime(
                  `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`,
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

  // const { minutes, seconds } = formattedRes;

  return (
    <div className="flex items-center gap-2 border border-orange rounded-[30px] bg-white pl-2">
      <p className="text-orange text-xs">Payment Page Expires in</p>

      <div className="flex justify-center items-center px-2 py-1 gap-0.5 rounded-[40px] text-xs font-bold bg-orange text-white w-[64px]">
        <IconClock />
        {remainingTime}
      </div>
    </div>
  );
}

export default CountDown;
