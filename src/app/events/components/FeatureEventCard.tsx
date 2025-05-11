"use client";

import { useRouter } from "next/navigation";
import { EventFormData } from "@/types/schema";
import React from "react";

interface Props {
  event: EventFormData;
}

export default function FeaturedEventCard({ event }: Props) {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`/events/${event.id}`); // Navigating to the specific event page
  };

  return (
    <div className="card w-full max-w-[400px] bg-base-100 border border-pink-200 shadow-md rounded-xl overflow-hidden">
      {/* Featured Badge */}
      <div className="relative">
        <img
          src={event.headerImage[0]}
          alt={event.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 badge badge-secondary text-white bg-pink-500 border-none">
          🐐 Featured
        </div>
      </div>

      <div className="card-body p-4 space-y-2">
        <h2 className="card-title text-lg font-bold">{event.name}</h2>

        {/* Time and Price */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            {new Date(event.startTime).toLocaleString("en-US", {
              weekday: "short",
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
          <span className="badge badge-outline">${event.price}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600">{event.info}</p>

        {/* Expectation section (first item only) */}
        {event.expect?.length > 0 && (
          <p className="text-sm text-gray-700">{event.expect[0].description}</p>
        )}

        {/* Action button */}
        <div className="card-actions justify-end">
          <button
            onClick={handleButtonClick}
            className="btn btn-sm btn-circle bg-pink-100 text-pink-500 border-none hover:bg-pink-200"
          >
            ➜
          </button>
        </div>
      </div>
    </div>
  );
}
