"use client";

import EventForm from "../components/EventForm";
import { EventFormData } from "../components/EventForm";

export default function NewEventPage() {
  const handleCreate = async (data: EventFormData) => {
    const res = await fetch("/api/events/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Event created!");
    } else {
      alert("Failed to create event.");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-base-200">
      <div className="max-w-2xl mx-auto bg-white shadow-xl p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Create New Event</h1>
        <EventForm onSubmit={handleCreate} submitLabel="Create Event" />
      </div>
    </div>
  );
}
