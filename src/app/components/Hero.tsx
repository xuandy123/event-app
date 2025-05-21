import { FC } from "react";
import SubscriptionForm from "./SubscriptionForm";
import { APP_NAME } from "../constants";

const Hero: FC = () => {
  return (
    <main className="bg-white text-black p-4 flex flex-col items-center justify-center md:flex-row md:justify-around">
      {/* Left Section */}
      <div className="max-w-lg space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-center">
          Your Weekly Text For Chicago&apos;s Best
        </h1>
        <div className="relative w-full mb-8 ">
        {/* Background Video */}
        <video
          className="top-0 left-0 w-full object-cover rounded-2xl"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={"/dibs_montage.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
        <SubscriptionForm />

        <ul className="space-y-3">
          <li>📅 1 weekly text that puts you on to the best of Chicago</li>
          <li>🎭 A curated list of the best upcoming events</li>
          <li>🍹 The best food and drinks that you need to try</li>
          <li>🎁 Free drinks, prizes, and nightlife perks</li>
        </ul>
      </div>
    </main>
  );
};

export default Hero;
