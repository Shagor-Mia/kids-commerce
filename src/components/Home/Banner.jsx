import { fontBangla } from "@/app/layout";
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex-1 space-y-5">
        <h2 className={`${fontBangla.className} text-5xl font-bold leading-20`}>
          আপনার বাচ্চার জন্য পছন্দের খেলনা{" "}
          <span className="text-primary">নির্বাচন করুন</span> ।
        </h2>
        <p className="text-2xl">Buy every toy with up to 15% discount</p>
        <button className="btn btn-primary btn-outline">
          {" "}
          Explore Products
        </button>
      </div>
      <div className="flex-1">
        <Image src={"/assets/hero.png"} alt="hero" width={500} height={400} />
      </div>
    </div>
  );
};

export default Banner;
