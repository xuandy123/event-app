"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { EventFormData } from "@/types/schema";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface Coordinates {
  lat: number;
  lng: number;
}

export default function EventDetailsPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState<EventFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mapCoordinates, setMapCoordinates] = useState<Coordinates | null>(
    null,
  );
  const [mapLoading, setMapLoading] = useState(false);
  const controlAddedRef = useRef(false);

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: "0.5rem",
  };

  // Load Google Maps API script
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  useEffect(() => {
    if (slug) {
      const fetchEvent = async () => {
        try {
          const response = await fetch(`/api/events/slug`, {
            method: "POST",
            body: JSON.stringify({ slug }),
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
  }, [slug]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-4xl font-extrabold text-primary mb-6">
        {event.name}
      </h1>
      <img
        src={event.headerImage[0]}
        alt={event.name}
        className="w-full h-[400px] md:h-[600px] object-cover rounded-lg mb-4"
      />
      <p className="text-md text-gray-700 mb-4">{event.details}</p>
      <div className="text-sm text-gray-500 mb-4">
        <p>
          <strong>When:</strong>{" "}
          {new Date(event.startTime).toLocaleString("en-US", {
            weekday: "short",
            hour: "numeric",
            minute: "numeric",
          })}{" "}
          -{" "}
          {new Date(event.endTime).toLocaleString("en-US", {
            weekday: "short",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
        <p>
          <strong>Where:</strong> {event.where}
        </p>
        <p>
          <strong>Price:</strong>{" "}
          {event.price === "0" || event.price.toLowerCase() === "free"
            ? "Free"
            : `$${event.price}`}
        </p>
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
      ) : null}

      {event.url && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-md mx-auto">
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-red-400 hover:bg-red-500 text-white font-bold text-lg py-4 px-6 rounded-lg text-center transition-colors duration-200 shadow-lg"
            >
              Get Tickets
            </a>
            <div className="flex items-center justify-center mt-2 text-sm text-gray-300">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              www.dibschicago.com
            </div>
          </div>
        </div>
      )}

      <div className="my-6">
        <h3 className="text-2xl font-bold mb-4">Location</h3>
        {mapLoading ? (
          <div className="bg-gray-100 rounded-lg w-full h-64 flex items-center justify-center">
            <p>Loading map...</p>
          </div>
        ) : loadError ? (
          <div className="bg-gray-100 rounded-lg w-full h-64 flex items-center justify-center">
            <p>Map failed to load.</p>
          </div>
        ) : isLoaded && mapCoordinates ? (
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

              map.controls[window.google.maps.ControlPosition.LEFT_BOTTOM].push(
                controlDiv,
              );
            }}
          >
            <Marker position={mapCoordinates} />
          </GoogleMap>
        ) : (
          <div className="bg-gray-100 rounded-lg w-full h-64 flex items-center justify-center">
            <p>Map location unavailable</p>
          </div>
        )}
      </div>
    </div>
  );
}
