import { FC } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: FC = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Never Miss <span className="text-purple-600">Another Event</span> Again
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get weekly notifications about the hottest events happening around you, delivered straight to your phone.
          </p>
          <a 
            href="#subscribe" 
            className="inline-flex items-center bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-700 transition text-lg font-medium"
          >
            Get Started <ArrowRight className="ml-2" size={20} />
          </a>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-64 h-96 bg-gray-200 rounded-3xl shadow-lg overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-8 bg-gray-300 flex items-center justify-center">
              <div className="w-16 h-4 bg-gray-400 rounded-full"></div>
            </div>
            <div className="pt-12 px-4">
              <div className="bg-white p-4 rounded-lg mb-3 shadow">
                <p className="text-sm font-medium text-purple-600">ALERT</p>
                <p className="text-lg font-medium">Jazz Festival this weekend!</p>
                <p className="text-xs text-gray-500">Tap for details</p>
              </div>
              <div className="bg-white p-4 rounded-lg mb-3 shadow">
                <p className="text-sm font-medium text-purple-600">ALERT</p>
                <p className="text-lg font-medium">Food Truck Rally tomorrow</p>
                <p className="text-xs text-gray-500">Tap for details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;