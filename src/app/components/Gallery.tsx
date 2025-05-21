"use client";

import { FC, useState } from 'react';
import Image from "next/image";

// Define types for our gallery items
interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
  category?: string;
}

const Gallery: FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      image: "/gallery/twin-peax.jpg",
      title: "312 Week",
      description: "Goose Island Beer Company Awesome Deals Around Chicago",
      category: "beer"
    },
    {
      id: 2,
      image: "/gallery/twin-peax.jpg",
      title: "Brew Dr. Kombucha",
      description: "Organic kombucha varieties in glass bottles",
      category: "kombucha"
    },
    {
      id: 3,
      image: "/gallery/twin-peax.jpg",
      title: "Paradise Alley",
      description: "Tropical themed beverages and vibes",
      category: "cocktails"
    },
    {
      id: 4, 
      image: "/gallery/twin-peax.jpg",
      title: "Deep Eddy Vodka",
      description: "Multi City Partnership",
      category: "spirits"
    },
    {
      id: 5,
      image: "/gallery/twin-peax.jpg",
      title: "Stella Artois",
      description: "Joie de LA special promotion",
      category: "beer"
    },
    {
      id: 6,
      image: "/gallery/twin-peax.jpg",
      title: "Jack Daniel's",
      description: "It Starts With Rye campaign",
      category: "whiskey"
    },
    {
      id: 7,
      image: "/gallery/twin-peax.jpg",
      title: "Korbel",
      description: "Midnight Brunch champagne event",
      category: "champagne"
    },
    {
      id: 8,
      image: "/gallery/twin-peax.jpg",
      title: "OkCupid",
      description: "Dating Deserves Better",
      category: "partnership"
    }
  ];
  
  const openModal = (id: number): void => {
    setSelectedImage(galleryItems.find(item => item.id === id) || null);
  };
  
  const closeModal = (): void => {
    setSelectedImage(null);
  };
  
  return (
    <div>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-center mb-4">Hottest Chicago Events</h2>
        <div className='flex justify-center bg-black'>
        <div className="px-4 lg:px-32 py-8">
      
      {/* Gallery Grid - Changed to show 2 columns on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {galleryItems.map((item) => (
          <div 
            key={item.id} 
            className="relative overflow-hidden bg-black cursor-pointer group"
            onClick={() => openModal(item.id)}
          >
            <div className="aspect-square relative">
              <Image 
                src={item.image} 
                alt={item.title}
                width={720}
                height={480}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay with text - Made text smaller on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 sm:p-4">
                <h3 className="text-white text-sm sm:text-xl font-bold">{item.title}</h3>
                <p className="text-white/80 text-xs sm:text-sm hidden sm:block">{item.description}</p>
                {item.category && (
                  <span className="inline-block bg-white/20 text-white text-xs px-2 py-1 rounded mt-1 sm:mt-2">
                    {item.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" 
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            className="bg-white rounded-lg max-w-3xl w-full max-h-screen overflow-auto" 
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <div className="relative">
              <Image 
                src={selectedImage.image} 
                alt={selectedImage.title}
                width={720}
                height={480} 
                className="w-full h-auto"
              />
              <button 
                className="absolute top-4 right-4 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center"
                onClick={closeModal}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <h3 id="modal-title" className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-gray-600 mb-4">{selectedImage.description}</p>
              {selectedImage.category && (
                <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded">
                  {selectedImage.category}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}

export default Gallery;