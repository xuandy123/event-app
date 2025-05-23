"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { EventFormData } from "@/types/schema";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface Coordinates {
  lat: number;
  lng: number;
}

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mapCoordinates, setMapCoordinates] = useState<Coordinates | null>(
    null,
  );
  const [mapLoading, setMapLoading] = useState(false);
  const controlAddedRef = useRef(false); // <-- Track if the control was added

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: "0.5rem",
  };

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await fetch(`/api/events/${id}`, {
            method: "POST",
            body: JSON.stringify({ id: id }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          setEvent(data.data.event);
          if (data.data.event.where) {
            geocodeAddress(data.data.event.where);
          }
        } catch (error) {
          console.error("Failed to load event details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchEvent();
    }
  }, [id]);

  const geocodeAddress = async (address: string) => {
    setMapLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        console.error("Google Maps API key is missing");
        setMapLoading(false);
        return;
      }

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address,
        )}&key=${apiKey}`,
      );

      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setMapCoordinates({ lat, lng });
      } else {
        console.error(
          "Geocoding failed:",
          data.status,
          data.error_message || "",
        );
        if (data.status === "REQUEST_DENIED") {
          console.error(
            "API key may be invalid, missing, or has insufficient permissions",
          );
        }
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    } finally {
      setMapLoading(false);
    }
  };

  if (loading) return <p>Loading event details...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-4xl font-extrabold text-primary mb-6">
        {event.name}
      </h1>
      <img
        src={event.headerImage[0]}
        alt={event.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-lg text-gray-700 mb-4">{event.details}</p>
      <div className="text-sm text-gray-500 mb-4">
        <p>
          <strong>When:</strong>{" "}
          {new Date(event.startTime).toLocaleString("en-US", {
            weekday: "short",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
        <p>
          <strong>Where:</strong> {event.where}
        </p>
        <p>
          <strong>Price:</strong> ${event.price}
        </p>
      </div>

      {/* Google Maps Section */}
      <div className="my-6">
        <h3 className="text-2xl font-bold mb-4">Location</h3>
        {mapLoading ? (
          <div className="bg-gray-100 rounded-lg w-full h-64 flex items-center justify-center">
            <p>Loading map...</p>
          </div>
        ) : mapCoordinates ? (
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCoordinates}
              zoom={15}
              onLoad={(map) => {
                if (controlAddedRef.current) return;
                controlAddedRef.current = true;

                const controlDiv = document.createElement("div");
                controlDiv.style.backgroundColor = "#fff";
                controlDiv.style.border = "2px solid #ccc";
                controlDiv.style.borderRadius = "3px";
                controlDiv.style.margin = "10px";
                controlDiv.style.padding = "6px 12px";
                controlDiv.style.cursor = "pointer";
                controlDiv.style.fontSize = "14px";
                controlDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
                controlDiv.textContent = "Open in Google Maps";

                controlDiv.addEventListener("click", () => {
                  window.open(
                    `https://www.google.com/maps?q=${mapCoordinates.lat},${mapCoordinates.lng}`,
                    "_blank",
                  );
                });

                map.controls[
                  window.google.maps.ControlPosition.LEFT_BOTTOM
                ].push(controlDiv);
              }}
            >
              <Marker position={mapCoordinates} />
            </GoogleMap>
          </LoadScript>
        ) : (
          <div className="bg-gray-100 rounded-lg w-full h-64 flex items-center justify-center">
            <p>Map location unavailable</p>
          </div>
        )}
      </div>

      <h3 className="text-2xl font-bold mb-4">Expectations</h3>
      {event.expect?.length > 0 ? (
        <ul>
          {event.expect.map((expectation, index) => (
            <li key={index} className="text-sm text-gray-600 mb-2">
              <strong>{expectation.title}:</strong> {expectation.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No expectations listed for this event.</p>
      )}
    </div>
  );
}
