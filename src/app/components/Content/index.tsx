"use client";
import { splitThousandSeparator } from "@/utils/splitThousandSeparator";
import ShadowCard from "@/components/ShadowCard";
import Payment from "@/app/components/Payment";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import {
  checkPageExpiry,
  checkPaymentStatus,
} from "@/services/paymentController";
import { useEffect } from "react";
import NewPayment from "../Payment/newPayment";

const DynamicQrCode = dynamic(() => import("@/app/components/QrCode"), {
  ssr: false,
});

const DynamicCountDown = dynamic(() => import("@/app/components/CountDown"), {
  ssr: false,
});

function Content() {
  const urlParams = useSearchParams();
  const router = useRouter();

  let amount = urlParams.get("amount") || 100;
  let txId = urlParams.get("txid")|| "";
  let token = urlParams.get("token") || "";
  let redirect = urlParams.get("url");

  useEffect(() => {
    if (!token || !txId) return;

    // Function to fetch payment status
    const fetchPaymentStatus = async () => {
      try {
        const response = await checkPaymentStatus(token, txId);
        // console.log(response);
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
    const intervalId = setInterval(fetchPaymentStatus, 15000);

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [token, txId, redirect, router]);

  useEffect(() => {
    checkPageExpiry(token)
      .then()
      .catch((error) => {
        console.log("error", error);
      });
  }, [token]);

  return (
    <>
      <div >
        {/* <p className="text-[32px] font-bold tracking-[0.15px] sm:text-[40px]">{`₹ ${splitThousandSeparator(Number(amount))}`}</p> */}
        {/* <DynamicCountDown /> */}
      </div>

      {/* <ShadowCard className="gap-4 py-6 sm:py-10">
        <DynamicQrCode />
      </ShadowCard> */}

     <NewPayment/>
    </>
  );
}

export default Content;
