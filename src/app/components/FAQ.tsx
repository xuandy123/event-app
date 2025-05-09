import React from "react";
import { APP_NAME } from "../constants";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      question: `How much does ${APP_NAME} cost?`,
      answer: `${APP_NAME} is completely free! Standard message and data rates from your carrier may apply.`,
    },
    {
      question: "How often will I receive texts?",
      answer:
        "You'll receive one text message per week, typically on Friday afternoons so you can plan your weekend.",
    },
    {
      question: "Can I unsubscribe?",
      answer:
        "You can unsubscribe at any time by replying STOP to any of our messages.",
    },
    {
      question: "Do you share my phone number with anyone?",
      answer:
        "Never. We value your privacy and will never share your information with third parties.",
    },
    {
      question: "How do you choose what to include?",
      answer:
        "Our team of local experts curates each week's recommendations based on what's new, exciting, and worth your time in Chicago.",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Frequently Asked Questions
      </h1>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {faq.question}
            </h2>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
