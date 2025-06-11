"use client";

import { EventFormData } from "@/types/schema";
import EventCard from "./../components/EventCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { format, startOfWeek, parseISO } from "date-fns";

export default function ArchivedEvents() {
  const [events, setEvents] = useState<EventFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events/listall/", {
          method: "POST",
          body: JSON.stringify({
            live: false,
            archive: true,
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

  const handleDeleteEvent = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    try {
      const res = await fetch("/api/events/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setEvents((prev) => prev.filter((event) => event.id !== id));
        alert("Event deleted.");
      } else {
        alert("Failed to delete event.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred.");
    }
  };

  // Group events by week
  const groupedEvents = events.reduce(
    (acc, event) => {
      const date = parseISO(event.createdAt); // or new Date(event.startDate)
      const weekStart = format(
        startOfWeek(date, { weekStartsOn: 0 }),
        "MMMM d, yyyy",
      ); // Sunday
      if (!acc[weekStart]) acc[weekStart] = [];
      acc[weekStart].push(event);
      return acc;
    },
    {} as Record<string, EventFormData[]>,
  );

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-6">My Events</h1>

        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : events.length === 0 ? (
          <div className="text-center text-lg">No events found.</div>
        ) : (
          Object.entries(groupedEvents).map(([week, weekEvents]) => (
            <div key={week} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">{`Week of ${week}`}</h2>
              <div className="flex flex-wrap gap-4">
                {weekEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    editable={true}
                    onEdit={() =>
                      router.push(`/admin/dashboard/edit-event/${event.slug}`)
                    }
                    onDelete={(id) => handleDeleteEvent(id)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
