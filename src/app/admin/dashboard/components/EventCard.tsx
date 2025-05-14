"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EventFormData } from "@/types/schema";

interface EventCardProps {
  event: EventFormData;
  editable?: boolean;
  onEdit?: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
}

export default function EventCard({
  event,
  editable = false,
  onEdit,
  onDelete,
}: EventCardProps) {
  return (
    <div className="card max-w-[400px] bg-white shadow-md border rounded-xl overflow-hidden">
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

      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-title">{event.name}</h2>
          {event.featured && (
            <div className="badge badge-secondary text-white bg-pink-500 border-none">
              🐐 Featured
            </div>
          )}
        </div>

        {/* Venue name */}
        {event.venue && (
          <p className="text-sm text-pink-500 font-semibold">{event.venue}</p>
        )}
        <p>{event.info}</p>

        <p className="text-sm text-gray-500">
          <strong>Start:</strong> {new Date(event.startTime).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          <strong>End:</strong> {new Date(event.endTime).toLocaleString()}
        </p>

        <p className="text-gray-700 mb-2">{event.details}</p>
        <p className="text-sm">
          <strong>Price:</strong> ${event.price}
        </p>

        <p className="text-sm">
          <strong>Where:</strong>{" "}
          {Array.isArray(event.where) ? event.where.join(", ") : event.where}
        </p>

        {event.expect && event.expect.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">What to Expect:</h3>
            <ul className="list-disc list-inside space-y-2">
              {event.expect.map((item, index) => (
                <li key={index}>
                  <strong>{item.title}:</strong> {item.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-2 space-x-2">
          {event.instagram && (
            <a href={event.instagram} className="btn btn-sm btn-outline">
              Instagram
            </a>
          )}
          {event.tiktok && (
            <a href={event.tiktok} className="btn btn-sm btn-outline">
              TikTok
            </a>
          )}
          {event.facebook && (
            <a href={event.facebook} className="btn btn-sm btn-outline">
              Facebook
            </a>
          )}
        </div>

        {editable && (
          <div className="mt-4 flex gap-2">
            <button
              className="btn btn-sm btn-info"
              onClick={() => onEdit?.(event.id)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-error"
              onClick={() => onDelete?.(event.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
