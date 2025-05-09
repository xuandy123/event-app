import React from "react";
import SubscriptionForm from "./SubscriptionForm";

const EndCTA: React.FC = () => {
  return (
    <div className="px-4 py-32 bg-red-50 rounded-lg shadow-md">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Ready to discover the best of Chicago?
          </h1>
          <p className="text-gray-600">
            Join thousands of Chicagoans who get our weekly text updates about
            the city&apos;s best events, food, and more.
          </p>
        </div>

        <SubscriptionForm />

        <p className="mt-4 text-xs text-gray-500 text-center">
          No spam. Unsubscribe anytime. Standard message rates may apply
        </p>
      </div>
    </div>
  );
};

export default EndCTA;
