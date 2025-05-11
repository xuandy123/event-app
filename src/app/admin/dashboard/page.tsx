/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";

interface Event {
  name: string;
  id: string;
  info: string;
  headerImage: string[];
  when: string;
  startTime: string; // Add startDate to handle event start date
  endTime: string; // Add endDate to handle event end date
  where: string[]; // Expecting an array of strings here
  price: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  details: string;
  expect: any;
}

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events/listall/", {
          method: "POST",
          body: JSON.stringify({}),
        });
        const data = await response.json();
        console.log(data);
        setEvents(data.data.events || []);
      } catch (error) {
        console.error("Failed to load events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Events</h1>

        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : events.length === 0 ? (
          <div className="text-center text-lg">No events found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="card bg-white shadow-md border rounded-xl overflow-hidden"
              >
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

                  {/* Display start and end date with formatted strings */}
                  <p className="text-sm text-gray-500">
                    <strong>Start:</strong>{" "}
                    {new Date(event.startTime).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>End:</strong>{" "}
                    {new Date(event.endTime).toLocaleString()}
                  </p>

                  <p className="text-gray-700 mb-2">{event.details}</p>
                  <p className="text-sm">
                    <strong>Price:</strong> ${event.price}
                  </p>

                  {/* Check if `where` is an array before using .join() */}
                  <p className="text-sm">
                    <strong>Where:</strong>{" "}
                    {Array.isArray(event.where)
                      ? event.where.join(", ")
                      : event.where}
                  </p>

                  <div className="mt-2 space-x-2">
                    {event.instagram && (
                      <a
                        href={event.instagram}
                        className="btn btn-sm btn-outline"
                      >
                        Instagram
                      </a>
                    )}
                    {event.tiktok && (
                      <a href={event.tiktok} className="btn btn-sm btn-outline">
                        TikTok
                      </a>
                    )}
                    {event.facebook && (
                      <a
                        href={event.facebook}
                        className="btn btn-sm btn-outline"
                      >
                        Facebook
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
