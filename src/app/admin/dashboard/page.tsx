"use client";

import { EventFormData } from "@/types/schema";
import EventCard from "./components/EventCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [events, setEvents] = useState<EventFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-6">My Events</h1>

        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : events.length === 0 ? (
          <div className="text-center text-lg">No events found.</div>
        ) : (
          <div className="flex flex-wrap gap-8">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                editable={true}
                onEdit={(id) =>
                  router.push(`/admin/dashboard/edit-event/${id}`)
                }
                onDelete={(id) => handleDeleteEvent(id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
