"use client";

import { useState, FormEvent } from "react";

const emojis = ["😀", "🎉", "❤️", "🚀", "🔥", "👍", "😎", "💬", "📱"];
const CHARACTER_LIMIT = 800;

export default function SendSmsPage() {
  const [message, setMessage] = useState("");
  const [adminOnly, setAdminOnly] = useState(false);
  const [status, setStatus] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/sms/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, adminOnly }),
      });

      if (!res.ok) throw new Error("Failed to send SMS");

      setStatus("✅ SMS sent successfully!");
      setMessage("");
      setAdminOnly(false);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send SMS");
    }
  };

  const addEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-300 px-6 py-12 bg-white rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          Send SMS
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none text-lg"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
            />
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              aria-label="Toggle emoji picker"
              className="absolute right-3 bottom-3 text-2xl hover:scale-110 transition"
            >
              😊
            </button>

            {showEmojiPicker && (
              <div className="absolute bottom-14 right-0 bg-white border rounded-md shadow-md p-2 flex flex-wrap gap-2 max-w-xs z-10">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => addEmoji(emoji)}
                    className="text-2xl hover:bg-red-100 rounded-md p-1 transition"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {/* Character count display */}
            <div
              className={`text-sm mt-1 text-right ${
                message.length > CHARACTER_LIMIT
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {message.length} / {CHARACTER_LIMIT}
            </div>
          </div>

          {/* Admin Only Toggle */}
          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={adminOnly}
              onChange={() => setAdminOnly(!adminOnly)}
              className="form-checkbox h-4 w-4 text-primary"
            />
            <span>Send to admins only</span>
          </label>

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition"
          >
            Send SMS
          </button>

          {status && (
            <p
              className={`mt-3 text-center font-medium ${
                status.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
