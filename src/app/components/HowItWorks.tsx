import { FC } from "react";

const steps = [
  {
    number: 1,
    title: "Sign Up",
    description: "Enter your phone number to subscribe to our weekly text updates.",
  },
  {
    number: 2,
    title: "Receive Updates",
    description: "Get one text message every week with curated Chicago recommendations.",
  },
  {
    number: 3,
    title: "Enjoy Chicago",
    description: "Use our recommendations to experience the best of what Chicago has to offer.",
  },
];

const HowItWorks: FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-4xl font-bold mb-2">
          How It Works
        </h1>
        <p className="text-gray-600 mb-12">Simple, convenient, and no app required</p>

        <div className="grid gap-12 md:grid-cols-3 items-start">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Line */}
              {index <= steps.length - 1 && (
                <div className="absolute top-6 left-1/2 right-[-50%] hidden md:block border-t border-red-200 w-full transform -translate-x-1/2 z-0" />
              )}
              <div className="flex flex-col items-center relative z-10">
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center text-lg font-semibold mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
