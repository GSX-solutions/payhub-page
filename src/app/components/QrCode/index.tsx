"use client";
import styles from "./style.module.scss";
import { QRCodeCanvas } from "qrcode.react";
import { useSearchParams } from "next/navigation";

function QrCode() {
  const urlParams = useSearchParams();

  let gateway = urlParams.get("gateway") || "";
  let upi = urlParams.get("upi") || "";
  let qr = urlParams.get("qr") || "";

  const isIOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);

  const qrcodeMap: Record<string, string> = {
    payhubb: upi,
    payhubp: qr,
    payhubA: decodeURIComponent(qr),
    payhubpt: decodeURIComponent(qr),
    payhubPE: decodeURIComponent(qr),
    payhubSt: upi,
    payhubPG:decodeURIComponent(qr)
  };

  if (isIOS) {
    qrcodeMap.payhubA = decodeURIComponent(qr);
    qrcodeMap.payhubpt = upi;
    qrcodeMap.payhubSt = decodeURIComponent(qr);
  }

  const qrcodeValue = qrcodeMap[gateway];

  return (
    <div className={styles.qrCode}>
      <p className="text-xl font-bold mb-5 text-center">Scan and Pay</p>
      <div className="qr-code-container">
        <QRCodeCanvas
          value={qrcodeValue}
          level="Q"
          className="sm:!size-[276px]"
        />
      </div>
    </div>
  );
}

export default QrCode;
