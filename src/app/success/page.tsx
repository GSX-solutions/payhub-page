import Image from "next/image";
import ShadowCard from "@/components/ShadowCard";
import PaymentStatus from "../components/paymentStatus/paymentStatus";

function PaymentSuccessful() {
  return (
    <PaymentStatus status="success" />
  );
}

export default PaymentSuccessful;
