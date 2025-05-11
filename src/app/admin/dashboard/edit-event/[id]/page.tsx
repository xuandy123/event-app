"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EventForm from "../../components/EventForm";

type EventFormData = {
  name: string;
  info: string;
  headerImage: string[];
  startTime: string;
  endTime: string;
  where: string;
  price: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  details: string;
  expect: { title: string; description: string }[];
};

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();

  const [eventData, setEventData] = useState<EventFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`, {
          method: "POST",
          body: JSON.stringify({ id: id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch event.");
        const data = await res.json();
        setEventData(data.data.event);
      } catch (err) {
        alert("Could not fetch event." + err);
        router.push("/events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, router]);

  const handleUpdate = async (updatedData: EventFormData) => {
    const res = await fetch(`/api/events/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      alert("Event updated!");
      router.push("/admin/dashboard/");
    } else {
      alert("Failed to update event.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-10 bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-screen p-10 bg-base-200 flex items-center justify-center">
        <p className="text-lg">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 bg-base-200">
      <div className="max-w-2xl mx-auto bg-white shadow-xl p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
        <EventForm
          initialData={eventData}
          onSubmit={handleUpdate}
          submitLabel="Update Event"
        />
      </div>
    </div>
  );
}
