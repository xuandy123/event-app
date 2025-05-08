import { FC } from 'react';
import { Bell, MessageSquare, Map, Calendar } from 'lucide-react';

export interface FeatureItem {
    icon: React.ReactNode;
    title: string;
    description: string;
  }

const Features: FC = () => {
  const features: FeatureItem[] = [
    {
      icon: <Bell size={24} className="text-purple-600" />,
      title: "Weekly Notifications",
      description: "Receive a curated list of upcoming events every week, no spam."
    },
    {
      icon: <MessageSquare size={24} className="text-purple-600" />,
      title: "Text Message Updates",
      description: "Get updates directly via SMS - no apps to download or accounts to create."
    },
    {
      icon: <Map size={24} className="text-purple-600" />,
      title: "Local Events",
      description: "Events are tailored to your location so you only get relevant suggestions."
    },
    {
      icon: <Calendar size={24} className="text-purple-600" />,
      title: "Easy RSVP",
      description: "Reply to any message to get more info or RSVP to events instantly."
    }
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose EventAlert?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;