"use client";

import { EventFormData } from "@/types/schema";
import { useState, FormEvent } from "react";

type Expectation = { title: string; description: string };

type EventFormProps = {
  initialData?: EventFormData;
  onSubmit: (data: EventFormData) => Promise<void>;
  submitLabel?: string;
};

export default function EventForm({
  initialData,
  onSubmit,
  submitLabel = "Submit",
}: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>(
    initialData || {
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
    },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "startTime" || name === "endTime") {
      // Convert local datetime to ISO with Z (UTC)
      const iso = new Date(value).toISOString();
      setFormData((prev) => ({ ...prev, [name]: iso }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (
    name: keyof EventFormData,
    index: number,
    value: string,
  ) => {
    const updatedArray = [...(formData[name] as string[])];
    updatedArray[index] = value;
    setFormData((prev) => ({ ...prev, [name]: updatedArray }));
  };

  const addArrayItem = (name: keyof EventFormData) => {
    const updatedArray = [...(formData[name] as string[]), ""];
    setFormData((prev) => ({ ...prev, [name]: updatedArray }));
  };

  const handleExpectChange = (
    index: number,
    field: keyof Expectation,
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
    await onSubmit(formData);
  };

  // Function to convert UTC time to local time format
  const convertToLocalTime = (utcDate: string) => {
    const localDate = new Date(utcDate);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");
    const hours = String(localDate.getHours()).padStart(2, "0");
    const minutes = String(localDate.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`; // Format: "YYYY-MM-DDTHH:MM"
  };

  // Convert UTC time to local time for display in the input field
  const formattedStartTime = convertToLocalTime(formData.startTime);
  const formattedEndTime = convertToLocalTime(formData.endTime);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Event Name"
        className="input input-bordered w-full"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="info"
        placeholder="Info"
        className="input input-bordered w-full"
        value={formData.info}
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

      <input
        type="datetime-local"
        name="startTime"
        className="input input-bordered w-full"
        value={formattedStartTime} // Format date-time for the input
        onChange={handleChange}
      />

      <input
        type="datetime-local"
        name="endTime"
        className="input input-bordered w-full"
        value={formattedEndTime} // Format date-time for the input
        onChange={handleChange}
      />
      <input
        type="text"
        name="where"
        placeholder="Location"
        className="input input-bordered w-full"
        value={formData.where}
        onChange={handleChange}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        className="input input-bordered w-full"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        type="text"
        name="instagram"
        placeholder="Instagram"
        className="input input-bordered w-full"
        value={formData.instagram}
        onChange={handleChange}
      />
      <input
        type="text"
        name="tiktok"
        placeholder="TikTok"
        className="input input-bordered w-full"
        value={formData.tiktok}
        onChange={handleChange}
      />
      <input
        type="text"
        name="facebook"
        placeholder="Facebook"
        className="input input-bordered w-full"
        value={formData.facebook}
        onChange={handleChange}
      />
      <textarea
        name="details"
        placeholder="Details"
        className="textarea textarea-bordered w-full"
        value={formData.details}
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
              onChange={(e) => handleExpectChange(i, "title", e.target.value)}
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
        {submitLabel}
      </button>
    </form>
  );
}
