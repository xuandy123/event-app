import { FC } from "react";
import SubscriptionForm from "./SubscriptionForm";
import { APP_NAME } from "../constants";

const Hero: FC = () => {
  return (
    <main className="bg-white text-black p-4 py-16 flex flex-col items-center justify-center md:flex-row md:justify-around">
      {/* Left Section */}
      <div className="max-w-lg space-y-6">
        <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full inline-block text-sm font-semibold">
          Chicago&apos;s Weekly Text Guide
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Your Weekly Text For Chicago&apos;s Best
        </h1>
        <ul className="space-y-3">
          <li>📅 1 weekly text that puts you on to the best of Chicago</li>
          <li>🎭 A curated list of the best upcoming events</li>
          <li>🍹 The best food and drinks that you need to try</li>
          <li>🎁 Free drinks, prizes, and nightlife perks</li>
        </ul>

        <SubscriptionForm />

        <p className="text-sm text-gray-500">
          By signing up for {APP_NAME} you consent to receive text messages from{" "}
          {APP_NAME} and other automated marketing messages. Msg and data rates
          apply.
        </p>
      </div>

      {/* Right Section */}
      <div className="bg-gray-100 shadow-lg rounded-2xl p-6 mt-12 md:mt-0 max-w-md w-full">
        <div className="text-red-600 font-bold text-lg">{APP_NAME}</div>
        <div className="text-gray-500 text-sm">Friday, 2:00 PM</div>

        <div className="mt-4 space-y-4">
          <div>
            <span className="font-bold">{APP_NAME} Weekly:</span> This weekend
            in Chicago! 🏙️
          </div>
          <div>
            🍽️ <span className="font-bold">EAT:</span> The new Portillo&apos;s
            pop-up in Wicker Park is serving Italian beef egg rolls that are
            breaking the internet.
          </div>
          <div>
            🍹 <span className="font-bold">DRINK:</span> Rooftop season is here!
            Cindy’s at the Chicago Athletic Association has new spring cocktails
            with skyline views.
          </div>
          <div>
            🎭 <span className="font-bold">DO:</span> The Randolph Street Market
            is back this Sat-Sun with 300+ vendors, food trucks, and live music.
            Use code {APP_NAME} for $5 off admission.
          </div>
          <div>
            📰 <span className="font-bold">NEWS:</span> The 606 trail extension
            breaks ground next week, adding 1.5 miles to the popular elevated
            path.
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Reply STOP to unsubscribe or HELP for help.
        </p>
      </div>
    </main>
  );
};

export default Hero;
