/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, FormEvent } from "react";

export default function NewEventPage() {
  const [formData, setFormData] = useState({
    name: "",
    info: "",
    headerImage: [""],
    startTime: "",
    endTime: "",
    where: "",
    price: "",
    instagram: "",
    tiktok: "",
    facebook: "",
    details: "",
    expect: [{ title: "", description: "" }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name: string, index: number, value: string) => {
    const updatedArray = [...(formData as any)[name]];
    updatedArray[index] = value;
    setFormData((prev) => ({ ...prev, [name]: updatedArray }));
  };

  const addArrayItem = (name: string) => {
    const updatedArray = [...(formData as any)[name], ""];
    setFormData((prev) => ({ ...prev, [name]: updatedArray }));
  };

  const handleExpectChange = (
    index: number,
    field: "title" | "description",
    value: string,
  ) => {
    const updated = [...formData.expect];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, expect: updated }));
  };

  const addExpectItem = () => {
    setFormData((prev) => ({
      ...prev,
      expect: [...prev.expect, { title: "", description: "" }],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="info"
            placeholder="Info"
            className="input input-bordered w-full"
            onChange={handleChange}
          />

          <div>
            <label className="label">Header Images</label>
            {formData.headerImage.map((val, i) => (
              <input
                key={i}
                type="text"
                value={val}
                onChange={(e) =>
                  handleArrayChange("headerImage", i, e.target.value)
                }
                className="input input-bordered w-full my-1"
              />
            ))}
            <button
              type="button"
              className="btn btn-sm mt-2"
              onClick={() => addArrayItem("headerImage")}
            >
              + Add Image
            </button>
          </div>

          <div>
            <label className="label">Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              className="input input-bordered w-full"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">End Time</label>
            <input
              type="datetime-local"
              name="endTime"
              className="input input-bordered w-full"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Location</label>
            <input
              type="text"
              name="where"
              placeholder="Location"
              className="input input-bordered w-full"
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            name="price"
            placeholder="Price"
            className="input input-bordered w-full"
            onChange={handleChange}
          />

          <input
            type="text"
            name="instagram"
            placeholder="Instagram"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="tiktok"
            placeholder="TikTok"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="facebook"
            placeholder="Facebook"
            className="input input-bordered w-full"
            onChange={handleChange}
          />

          <textarea
            name="details"
            placeholder="Details"
            className="textarea textarea-bordered w-full"
            onChange={handleChange}
          ></textarea>

          <div>
            <label className="label">Expectations</label>
            {formData.expect.map((exp, i) => (
              <div key={i} className="mb-3">
                <input
                  type="text"
                  placeholder="Expectation Title"
                  className="input input-bordered w-full mb-1"
                  value={exp.title}
                  onChange={(e) =>
                    handleExpectChange(i, "title", e.target.value)
                  }
                />
                <textarea
                  placeholder="Expectation Description"
                  className="textarea textarea-bordered w-full"
                  value={exp.description}
                  onChange={(e) =>
                    handleExpectChange(i, "description", e.target.value)
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className="btn btn-sm mt-2"
              onClick={addExpectItem}
            >
              + Add Expectation
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
