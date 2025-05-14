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

  function getWeekOfText(): string {
    const today = new Date();
    const day = today.getDay(); // 0 (Sun) to 6 (Sat)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - day); // Sunday as the start of the week

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
