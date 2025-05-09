import { FC } from "react";
import { Star } from "lucide-react";
import { APP_NAME } from "../constants";

interface TestimonialProps {
  quote: string;
  name: string;
  location: string;
}

const Testimonial: FC<TestimonialProps> = ({ quote, name, location }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      <p className="mt-4 text-gray-700 text-base">&quot;{quote}&quot;</p>

      <div className="mt-6 flex items-center">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <p className="text-sm text-green-600">{location}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: FC = () => {
  const testimonials = [
    {
      quote: `I discovered my favorite restaurant through ${APP_NAME}! The recommendations are always spot on and I love how easy it is to just get a text.`,
      name: "Sarah K.",
      location: "Lincoln Park",
    },
    {
      quote:
        "As a Chicago native, I'm impressed by how they find events even I didn't know about. It's like having a local guide in your pocket.",
      name: "Marcus J.",
      location: "West Loop",
    },
    {
      quote:
        "I love that I don't need another app. The text format is perfect for quick updates, and I've never been disappointed by their suggestions.",
      name: "Aisha T.",
      location: "Hyde Park",
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          What Our Subscribers Say
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              location={testimonial.location}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
