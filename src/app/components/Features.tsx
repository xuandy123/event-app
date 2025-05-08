import { FC } from "react";
import { CalendarDays, UtensilsCrossed, Newspaper } from "lucide-react";

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Features: FC = () => {
  const features: FeatureItem[] = [
    {
      icon: <CalendarDays size={28} className="text-red-600" />,
      title: "Local Events",
      description:
        "From street festivals to secret shows, we'll keep you updated on the best events happening around town.",
    },
    {
      icon: <UtensilsCrossed size={28} className="text-red-600" />,
      title: "Food & Drink",
      description:
        "Discover new restaurants, pop-ups, and bars that are worth checking out this weekend.",
    },
    {
      icon: <Newspaper size={28} className="text-red-600" />,
      title: "Local News",
      description:
        "Stay informed about what's happening in Chicago with bite-sized local news you actually care about.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-4xl font-bold text-gray-900 mb-4">
          Why ChiText?
        </h1>
        <p className="text-gray-600 mb-12">
          Stay in the know about everything Chicago has to offer
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
