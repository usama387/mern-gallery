import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div className="">
        <img src={assets.exchange_icon} alt="" className="w-12 m-auto mb-5" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-500 text-base">
          We offer a convenient exchange policy
        </p>
      </div>

      <div className="">
        <img src={assets.quality_icon} alt="" className="w-12 m-auto mb-5" />
        <p className="font-semibold">7 Return Policy</p>
        <p className="text-gray-500 text-base">
          We accept returns within a week
        </p>
      </div>

      <div className="">
        <img src={assets.support_img} alt="" className="w-12 m-auto mb-5" />
        <p className="font-semibold">Customer Support</p>
        <p className="text-gray-500 text-base">
          Customer support and satisfaction is our top priority
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
