import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useMemo } from "react";
import ShadowButton from "@/components/ShadowButton";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function PaymentSelect({ children }: { children?: ReactNode }) {
  const urlParams = useSearchParams();

  let phonepe = urlParams.get("phonepe") || "";
  let gpay = urlParams.get("gpay") || "";
  let paytm = urlParams.get("paytm") || "";
  let upi = urlParams.get("upi") || "";

  const upiData = {
    upi: decodeURIComponent(upi),
    phonepeurl: decodeURIComponent(phonepe),
    paytmurl: decodeURIComponent(paytm),
    gpayurl: decodeURIComponent(gpay),
  };

  const paymentMethods = [
    { icon: "paytm.svg", name: "paytm", url: upiData.paytmurl },
    { icon: "phonepe.svg", name: "phonepe", url: upiData.phonepeurl },
    { icon: "googlePay.svg", name: "googlePay", url: upiData.gpayurl },
    { icon: "otherUpi.svg", name: "otherUpi", url: upiData.upi },
  ];

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="rounded-3xl sm:rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Select your UPI APP</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-4 pt-6">
                {paymentMethods.map((item) => (
                  <Link
                    key={item.name}
                    href={item.url}
                    prefetch={false}
                    className="w-full"
                  >
                    <ShadowButton variant="secondary" className="p-5 w-full">
                      <Image
                        src={`/images/${item.icon}`}
                        alt={item.name}
                        width={78}
                        height={28}
                        className="w-auto object-contain"
                      />
                    </ShadowButton>
                  </Link>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PaymentSelect;
