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
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <section id="subscribe" className="py-20 bg-purple-50">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Our Community</h2>
        <p className="text-xl text-gray-600 mb-8">
          Subscribe now and never miss another event. It&apos;s completely free!
        </p>
        
        {submitted ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
            <p className="font-medium">Thanks for subscribing!</p>
            <p className="text-sm mt-2">You&apos;ll receive your first event update soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="phone" className="block text-left text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                placeholder="(123) 456-7890"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={phoneNumber}
                onChange={handlePhoneChange}
                required
              />
              {error && <p className="text-red-500 text-sm mt-1 text-left">{error}</p>}
            </div>
            <button 
              type="submit" 
              className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition font-medium"
            >
              Subscribe for Updates
            </button>
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to receive SMS messages from EventAlert. 
              Standard message and data rates may apply. You can unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default SubscriptionForm;