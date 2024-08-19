"use client";
import Image from "next/image";
import ShadowCard from "@/components/ShadowCard";

function PaymentFail() {
  // const router = useRouter();

  return (
    <div className="flex flex-col gap-10 w-full">
      {/*<p className="text-[40px] font-bold tracking-[0.15px] text-center">{`₹ ${splitThousandSeparator(Number(19923.12))}`}</p>*/}

      <ShadowCard className="gap-8">
        <Image
          src={"/images/fail.svg"}
          alt={"successful"}
          width={88}
          height={88}
        />
        <p className="text-2xl text-fail font-bold">Payment Fail</p>
      </ShadowCard>

      {/*<div className="flex gap-4">*/}
      {/*  <Link href="/" className="w-full">*/}
      {/*    <ShadowButton variant="secondary" className="w-full">*/}
      {/*      Return to website*/}
      {/*    </ShadowButton>*/}
      {/*  </Link>*/}
      {/*  <ShadowButton*/}
      {/*    variant="primary"*/}
      {/*    className="w-full"*/}
      {/*    onClick={() => router.back()}*/}
      {/*  >*/}
      {/*    Pay again*/}
      {/*  </ShadowButton>*/}
      {/*</div>*/}
    </div>
  );
}

export default PaymentFail;
