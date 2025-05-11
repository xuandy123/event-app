"use client";

import React from "react";

interface Event {
  id: string;
  name: string;
  info: string;
  headerImage: string[];
  startTime: string;
  endTime: string;
  where: string[] | string;
  price: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  details: string;
}

interface EventCardProps {
  event: Event;
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
    <div className="card bg-white shadow-md border rounded-xl overflow-hidden">
      {event.headerImage?.[0] && (
        <figure>
          <img
            src={event.headerImage[0]}
            alt="Event Header"
            className="w-full h-48 object-cover"
          />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{event.name}</h2>
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
