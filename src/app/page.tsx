"use client";
import dynamic from "next/dynamic";

const DynamicContent = dynamic(() => import("@/app/components/Content"), {
  ssr: false,
});

function Home() {
  return (
    <>
      <DynamicContent />
    </>
  );
}

export default Home;
