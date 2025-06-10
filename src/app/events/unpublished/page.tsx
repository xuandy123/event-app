"use client";

import { useEffect, useState } from "react";
import { EventFormData } from "@/types/schema";
import FeaturedEventCard from "./../components/FeatureEventCard";

export default function UnpublishedEventsPage() {
  const [events, setEvents] = useState<EventFormData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events/listall/", {
          method: "POST",
          body: JSON.stringify({
            live: false,
            archive: false,
          }),
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

  function getWeekOfText(): string {
    const today = new Date();
    const day = today.getDay(); // 0 (Sun) to 6 (Sat)
    const diff = (day === 0 ? -6 : 1) - day; // Adjust so Monday is 0

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + diff);

    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };

    return `Week of ${startOfWeek.toLocaleDateString("en-US", options)}`;
  }

  return (
    <div className="px-4 py-6 w-full min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-primary mb-4">
          {/* You can format the current date here as well */}
          {getWeekOfText()}
        </h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center w-full">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
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
