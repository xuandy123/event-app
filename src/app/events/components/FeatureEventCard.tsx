"use client";

import { useRouter } from "next/navigation";
import { EventFormData } from "@/types/schema";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
interface Props {
  event: EventFormData;
}

export default function FeaturedEventCard({ event }: Props) {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`/events/${event.slug}`);
  };

  return (
    <div className="card w-full max-w-[400px] bg-base-100 border border-primary shadow-md rounded-xl overflow-hidden">
      {/* Image and optional Featured Badge */}
      {event.headerImage?.length > 0 && (
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="w-full h-48 rounded-xl overflow-hidden"
        >
          {event.headerImage.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                className="w-full h-48 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="card-body p-4 space-y-2">
        <div className="flex justify-between items-baseline">
          <div className="flex flex-col">
            <h2 className="card-title">{event.name}</h2>
            {event.venue && (
              <p className="text-sm text-secondary font-semibold">
                {event.venue}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end space-y-1">
            {event.featured && (
              <div className="badge badge-secondary text-white bg-secondary border-none">
                Featured
              </div>
            )}
            <span className="badge badge-outline text-sm">
              {event.price === "0" || event.price === "free"
                ? "Free"
                : `$${event.price}`}
            </span>
          </div>
        </div>

        {/* Time and Price */}
        <div className="flex justify-between items-start text-sm text-gray-500">
          <div className="flex flex-col">
            <span>
              Start:&nbsp;
              {new Date(event.startTime).toLocaleString("en-US", {
                weekday: "short",
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
            <span>
              End:&nbsp;
              {new Date(event.endTime).toLocaleString("en-US", {
                weekday: "short",
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600">{event.info}</p>

        {/* Action button */}
        <div className="card-actions justify-end">
          <button
            onClick={handleButtonClick}
            className="btn btn-md btn-circle text-primary border-none hover:bg-accent-200"
          >
            ➜
          </button>
        </div>
      </div>
    </div>
  );
}
