import Image from "next/image";
import ShadowButton from "@/components/ShadowButton";
import PaymentSelect from "@/app/components/PaymentSelect";

const paymentMethods = [
  { icon: "phonepe.svg", name: "phonepe" },
  { icon: "paytm.svg", name: "paytm" },
  { icon: "googlePay.svg", name: "googlePay"},
  { icon: "otherUpi.svg", name: "otherUpi" },
];

function Payment() {
  // const isIOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-center items-center gap-5">
        {paymentMethods.map(item => (
          <Image
            key={item.name}
            src={`/images/${item.icon}`}
            alt={item.name}
            width={78}
            height={24}
            className="w-auto"
          />
        ))}
      </div>

      <PaymentSelect>
        <ShadowButton variant="primary">Pay using UPI Apps</ShadowButton>
      </PaymentSelect>
    </div>
  );
}

export default Payment;
