"use client";

import { FC } from "react";
import SubscriptionForm from "./SubscriptionForm";

const Hero: FC = () => {
  return (
    <main className="bg-white text-black py-10 flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16">
      {/* Left Column (Text content) */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
        <h1 className="text-2xl md:text-7xl font-bold leading-tight">
          Find the best in Chicago.
        </h1>
        <SubscriptionForm />

        <ul className="space-y-2 text-lg">
          <li>💎 We research Chicago events</li>
          <li>✍️ We create plans for the best ones</li>
          <li>💬 We text them to you (called &quot;Dibs!&quot;)</li>
        </ul>
      </div>

      {/* Right Column (Video) */}
      <div className="w-full md:w-1/2">
        <video
          className="w-full rounded-2xl object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/dibs_montage.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </main>
  );
};

export default Hero;
