import Image from "next/image";
import ShadowCard from "@/components/ShadowCard";

function PaymentSuccessful() {
  return (
    <div className="flex flex-col gap-10 w-full">
      {/*<p className="text-[40px] font-bold tracking-[0.15px] text-center">{`₹ ${splitThousandSeparator(Number(19923.12))}`}</p>*/}
      <ShadowCard className="gap-8">
        <Image
          src={"/images/successful.svg"}
          alt={"successful"}
          width={88}
          height={88}
        />
        <p className="text-2xl text-successful font-bold">Payment Successful</p>
      </ShadowCard>

      {/*<Link href="/" className="w-full">*/}
      {/*  <ShadowButton variant="primary" className="w-full">*/}
      {/*    Return to website*/}
      {/*  </ShadowButton>*/}
      {/*</Link>*/}
    </div>
  );
}

export default PaymentSuccessful;
