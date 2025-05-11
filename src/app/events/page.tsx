"use client";

import { useEffect, useState } from "react";
import { EventFormData } from "@/types/schema";
import FeaturedEventCard from "./components/FeatureEventCard";

export default function EventsPage() {
  const [events, setEvents] = useState<EventFormData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events/listall/", {
          method: "POST",
          body: JSON.stringify({}),
        });
        const data = await response.json();
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
    <div className="px-4 py-6 w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary">Week of</h2>
        <h1 className="text-5xl font-extrabold text-primary mb-4">
          {/* You can format the current date here as well */}
          Week of May 11th
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          🐐 This week is packed with adorable baby goats, pop-ups, and of
          course Mother’s Day festivities! 👇
        </p>
      </div>

      {loading ? (
        <p className="text-center">Loading events...</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {events.map((event, index) => (
            <FeaturedEventCard key={index} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
