"use client";

import { FC, useState, FormEvent, ChangeEvent } from 'react';

const SubscriptionForm: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    
    // Show success state
    setSubmitted(true);
    setError('');
    console.log(error, submitted);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <form className="space-y-4">
          <input
            type="tel"
            placeholder="Phone Number (required)"
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
            onChange={handlePhoneChange}
          />
          <button
            type="submit"
            onClick={() => handleSubmit}
            className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700"
          >
            Get Started →
          </button>
        </form>
  );
};

export default SubscriptionForm;