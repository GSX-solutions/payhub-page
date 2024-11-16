"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";

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
