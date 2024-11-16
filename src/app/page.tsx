"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const DynamicContent = dynamic(() => import("@/app/components/Content"), {
  ssr: false,
});

function Home() {
  useEffect(() => {
    // Dynamically set the height of the body to match the viewport
    document.body.style.height = `${window.innerHeight}px`;
  
    return () => {
      document.body.style.height = ""; // Reset on cleanup
    };
  }, []);
  
  return (
    <>
      <DynamicContent />
    </>
  );
}

export default Home;
