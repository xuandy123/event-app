"use client";

import { FC, useState, FormEvent, ChangeEvent } from "react";

const SubscriptionForm: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanedPhone = phoneNumber.replace(/\D/g, "");

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(cleanedPhone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanedPhone }),
      });

      if (!res.ok) {
        throw new Error("Failed to subscribe");
      }

      const data = await res.json();
      setSubmitted(true);
      setError("");
      console.log("Subscribed user ID:", data.userId);
    } catch (err: any) {
      console.error(err);
      setError("Subscription failed. Please try again.");
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="tel"
        placeholder="Phone Number (required)"
        className="w-full border border-gray-300 rounded px-4 py-2"
        required
        onChange={handlePhoneChange}
        value={phoneNumber}
      />
      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 hover:cursor-pointer"
      >
        Get Started →
      </button>

      {submitted && <p className="text-green-600">You're subscribed!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default SubscriptionForm;
