"use client";

import { FC, useState, FormEvent, ChangeEvent, useEffect } from "react";

const SubscriptionForm: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [consent, setConsent] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanedPhone = phoneNumber.replace(/\D/g, "");
    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(cleanedPhone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    if (!consent) {
      setError("You must agree to receive messages.");
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
      setSubmitted(true);
      setError("");
      (
        document.getElementById("subscription_modal") as HTMLDialogElement
      )?.close();
    } catch (err) {
      console.error(err);
      setError("Subscription failed. Please try again.");
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleConsentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConsent(e.target.checked);
  };

  const openModal = () => {
    (
      document.getElementById("subscription_modal") as HTMLDialogElement
    )?.showModal();
  };

  useEffect(() => {
    // Register a global function to open the modal
    (
      window as unknown as Window & { openSubscriptionModal: () => void }
    ).openSubscriptionModal = () => {
      (
        document.getElementById("subscription_modal") as HTMLDialogElement
      )?.showModal();
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="button px-6 py-3 bg-primary text-white font-semibold rounded-full hover:cursor-pointer"
      >
        Join for free
      </button>

      <dialog id="subscription_modal" className="modal">
        <div className="modal-box max-w-md p-6 bg-white rounded-2xl shadow-xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Subscribe to Dibs Chicago
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Get a weekly text with the best events, eats, and things to do in
            Chicago.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              onChange={handlePhoneChange}
              value={phoneNumber}
            />

            <label className="flex items-flex-start space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="checkbox"
                checked={consent}
                onChange={handleConsentChange}
              />
              <span>
                By checking this box, you agree to receive recurring SMS
                messages from Dibs Chicago. Message and data rates may apply.
                Reply STOP to unsubscribe.
              </span>
            </label>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="modal-action flex justify-between items-center">
              <button
                type="submit"
                className="bg-secondary text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition hover:cursor-pointer"
              >
                Subscribe
              </button>
              <button
                type="button"
                onClick={() =>
                  (
                    document.getElementById(
                      "subscription_modal",
                    ) as HTMLDialogElement
                  )?.close()
                }
                className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {submitted && (
        <p className="text-green-600 mt-4">You&apos;re subscribed!</p>
      )}
    </>
  );
};

export default SubscriptionForm;
