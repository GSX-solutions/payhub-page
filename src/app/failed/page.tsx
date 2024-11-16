"use client";
import Image from "next/image";
import ShadowCard from "@/components/ShadowCard";
import PaymentStatus from "../components/paymentStatus/paymentStatus";

function PaymentFail() {
  // const router = useRouter();

  return (
    <PaymentStatus status="failure" />

  );
}

export default PaymentFail;
